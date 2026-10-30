<?php
/**
 * Instalación one-shot de config.local.php fuera de public_html
 * (sobrevive a deploys Git). Solo funciona si aún no hay config.
 *
 * POST JSON: { "opsPin": "8210", "dbPassword": "...", "api2pdfKey": "" }
 * Luego borra este archivo.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, X-Ops-Pin');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
  exit;
}

$safeOutside = dirname(__DIR__, 2) . '/config.local.php';
$safeInside = __DIR__ . '/config.local.php';
if (is_file($safeOutside) || is_file($safeInside)) {
  http_response_code(409);
  echo json_encode(['ok' => false, 'error' => 'Ya existe config.local.php']);
  exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
if (!is_array($input)) $input = [];

$pin = '';
if (!empty($_SERVER['HTTP_X_OPS_PIN'])) $pin = (string) $_SERVER['HTTP_X_OPS_PIN'];
elseif (isset($input['opsPin'])) $pin = (string) $input['opsPin'];

if ($pin === '' || !hash_equals('8210', $pin)) {
  http_response_code(401);
  echo json_encode(['ok' => false, 'error' => 'Clave incorrecta']);
  exit;
}

$dbPassword = (string) ($input['dbPassword'] ?? '');
if ($dbPassword === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Falta dbPassword']);
  exit;
}

$api2pdf = (string) ($input['api2pdfKey'] ?? '');
$whatsapp = (string) ($input['whatsapp'] ?? '56979848821');
$opsPin = (string) ($input['ops_pin'] ?? '8210');

$export = static function (string $value): string {
  return var_export($value, true);
};

$php = "<?php\n"
  . "// Generado por install-config.php — fuera de public_html sobrevive al deploy.\n"
  . "return [\n"
  . "  'api2pdf_key' => " . $export($api2pdf) . ",\n"
  . "  'unit_price' => 7500,\n"
  . "  'whatsapp' => " . $export($whatsapp) . ",\n"
  . "  'ops_pin' => " . $export($opsPin) . ",\n"
  . "  'db' => [\n"
  . "    'host' => '127.0.0.1',\n"
  . "    'port' => 3306,\n"
  . "    'name' => 'u739953844_sanavida',\n"
  . "    'user' => 'u739953844_sanavida',\n"
  . "    'password' => " . $export($dbPassword) . ",\n"
  . "  ],\n"
  . "];\n";

if (@file_put_contents($safeOutside, $php) === false) {
  // Fallback: dentro de api/ (puede borrarse en el próximo deploy).
  if (@file_put_contents($safeInside, $php) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo escribir config.local.php']);
    exit;
  }
  $written = $safeInside;
} else {
  $written = $safeOutside;
}

// Verifica conexión.
try {
  $cfg = require $written;
  $db = $cfg['db'];
  $dsn = "mysql:host={$db['host']};port={$db['port']};dbname={$db['name']};charset=utf8mb4";
  $pdo = new PDO($dsn, $db['user'], $db['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  ]);
  $pdo->query('SELECT 1');
} catch (Throwable $e) {
  @unlink($written);
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Config escrita pero DB rechazó la conexión', 'detail' => $e->getMessage()]);
  exit;
}

@unlink(__FILE__);

echo json_encode([
  'ok' => true,
  'path' => $written,
  'selfDeleted' => !is_file(__FILE__),
]);
