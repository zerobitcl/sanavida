<?php
/**
 * Conexión MySQL + esquema + clientes por teléfono.
 * Host desde PHP en Hostinger: 127.0.0.1
 */

function sv_cfg(): array {
  static $cfg;
  if ($cfg === null) {
    $file = __DIR__ . '/config.local.php';
    if (!is_file($file)) {
      throw new RuntimeException('Falta config.local.php');
    }
    $cfg = require $file;
  }
  return $cfg;
}

function sv_pdo(): PDO {
  static $pdo;
  if ($pdo instanceof PDO) return $pdo;

  $c = sv_cfg();
  $db = $c['db'] ?? null;
  if (!$db || empty($db['name'])) {
    throw new RuntimeException('Falta configuración db en config.local.php');
  }

  $host = $db['host'] ?? '127.0.0.1';
  $port = (int) ($db['port'] ?? 3306);
  $dsn = "mysql:host={$host};port={$port};dbname={$db['name']};charset=utf8mb4";
  $pdo = new PDO($dsn, $db['user'], $db['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
  sv_migrate($pdo);
  return $pdo;
}

function sv_migrate(PDO $pdo): void {
  $pdo->exec("CREATE TABLE IF NOT EXISTS clients (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    name VARCHAR(180) NOT NULL DEFAULT '',
    email VARCHAR(180) NOT NULL DEFAULT '',
    orders_count INT UNSIGNED NOT NULL DEFAULT 0,
    quotes_count INT UNSIGNED NOT NULL DEFAULT 0,
    first_seen_at DATETIME NOT NULL,
    last_seen_at DATETIME NOT NULL,
    UNIQUE KEY uq_phone (phone),
    KEY idx_last_seen (last_seen_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

  $pdo->exec("CREATE TABLE IF NOT EXISTS orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_id INT UNSIGNED NOT NULL,
    phone VARCHAR(20) NOT NULL,
    name VARCHAR(180) NOT NULL DEFAULT '',
    comuna VARCHAR(80) NOT NULL DEFAULT '',
    cantidad VARCHAR(40) NOT NULL DEFAULT '',
    entrega VARCHAR(80) NOT NULL DEFAULT '',
    notas TEXT NULL,
    order_number INT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    KEY idx_client (client_id),
    KEY idx_created (created_at),
    CONSTRAINT fk_orders_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

  $pdo->exec("CREATE TABLE IF NOT EXISTS quotes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_id INT UNSIGNED NOT NULL,
    phone VARCHAR(20) NOT NULL,
    quote_code VARCHAR(40) NOT NULL,
    empresa VARCHAR(180) NOT NULL DEFAULT '',
    email VARCHAR(180) NOT NULL DEFAULT '',
    tipo VARCHAR(40) NOT NULL DEFAULT '',
    cantidad VARCHAR(80) NOT NULL DEFAULT '',
    detalle TEXT NULL,
    unit_price INT UNSIGNED NOT NULL DEFAULT 7500,
    pdf_url TEXT NULL,
    quote_number INT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    KEY idx_client (client_id),
    KEY idx_created (created_at),
    CONSTRAINT fk_quotes_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

/** Normaliza teléfono Chile → 569XXXXXXXX cuando se puede. */
function sv_phone(?string $raw): string {
  $d = preg_replace('/\D+/', '', (string) $raw);
  if ($d === '') return '';
  if (strlen($d) === 9 && str_starts_with($d, '9')) $d = '56' . $d;
  if (strlen($d) === 11 && str_starts_with($d, '569')) return $d;
  if (strlen($d) === 12 && str_starts_with($d, '0569')) return substr($d, 1);
  return $d;
}

/**
 * Busca o crea cliente por teléfono. Devuelve [client, isNew].
 */
function sv_upsert_client(PDO $pdo, string $phone, string $name = '', string $email = ''): array {
  $now = (new DateTimeImmutable('now', new DateTimeZone('America/Santiago')))->format('Y-m-d H:i:s');
  $st = $pdo->prepare('SELECT * FROM clients WHERE phone = ? LIMIT 1');
  $st->execute([$phone]);
  $row = $st->fetch();

  if ($row) {
    $newName = $name !== '' ? $name : $row['name'];
    $newEmail = $email !== '' ? $email : $row['email'];
    $upd = $pdo->prepare('UPDATE clients SET name = ?, email = ?, last_seen_at = ? WHERE id = ?');
    $upd->execute([$newName, $newEmail, $now, $row['id']]);
    $row['name'] = $newName;
    $row['email'] = $newEmail;
    $row['last_seen_at'] = $now;
    return [$row, false];
  }

  $ins = $pdo->prepare('INSERT INTO clients (phone, name, email, orders_count, quotes_count, first_seen_at, last_seen_at) VALUES (?,?,?,0,0,?,?)');
  $ins->execute([$phone, $name, $email, $now, $now]);
  $id = (int) $pdo->lastInsertId();
  return [[
    'id' => $id,
    'phone' => $phone,
    'name' => $name,
    'email' => $email,
    'orders_count' => 0,
    'quotes_count' => 0,
    'first_seen_at' => $now,
    'last_seen_at' => $now,
  ], true];
}

function sv_json(array $body, int $status = 200): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store');
  echo json_encode($body, JSON_UNESCAPED_UNICODE);
  exit;
}

function sv_read_json(): array {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw ?: '', true);
  return is_array($data) ? $data : [];
}
