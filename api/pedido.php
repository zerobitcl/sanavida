<?php
require __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  sv_json(['ok' => false, 'error' => 'Método no permitido'], 405);
}

$input = sv_read_json();
$nombre = trim((string) ($input['nombre'] ?? ''));
$telefono = sv_phone((string) ($input['telefono'] ?? ''));
$comuna = trim((string) ($input['comuna'] ?? ''));
$cantidad = trim((string) ($input['cantidad'] ?? ''));
$entrega = trim((string) ($input['entrega'] ?? ''));
$notas = trim((string) ($input['notas'] ?? ''));

if ($nombre === '' || $telefono === '') {
  sv_json(['ok' => false, 'error' => 'Nombre y teléfono son obligatorios'], 400);
}

try {
  $pdo = sv_pdo();
  $pdo->beginTransaction();
  [$client] = sv_upsert_client($pdo, $telefono, $nombre, '');
  $orderNumber = ((int) $client['orders_count']) + 1;
  $now = (new DateTimeImmutable('now', new DateTimeZone('America/Santiago')))->format('Y-m-d H:i:s');

  $ins = $pdo->prepare('INSERT INTO orders (client_id, phone, name, comuna, cantidad, entrega, notas, order_number, created_at) VALUES (?,?,?,?,?,?,?,?,?)');
  $ins->execute([(int) $client['id'], $telefono, $nombre, $comuna, $cantidad, $entrega, $notas !== '' ? $notas : null, $orderNumber, $now]);
  $orderId = (int) $pdo->lastInsertId();

  $pdo->prepare('UPDATE clients SET orders_count = orders_count + 1, last_seen_at = ? WHERE id = ?')->execute([$now, $client['id']]);
  $pdo->commit();

  $cfg = sv_cfg();
  $wa = preg_replace('/\D+/', '', (string) ($cfg['whatsapp'] ?? ''));
  $lines = [
    "Hola SanaVida, quiero hacer un pedido:",
    "• Nombre: {$nombre}",
    "• Teléfono: {$telefono}",
    "• Comuna: {$comuna}",
    "• Cantidad: {$cantidad} botella(s)",
    "• Entrega: {$entrega}",
    "• Notas: " . ($notas !== '' ? $notas : '—'),
  ];
  if ($orderNumber > 1) {
    $lines[] = "• (Cliente recurrente: pedido N.º {$orderNumber})";
  }

  sv_json([
    'ok' => true,
    'orderId' => $orderId,
    'orderNumber' => $orderNumber,
    'clientId' => (int) $client['id'],
    'isReturning' => $orderNumber > 1,
    'waUrl' => 'https://wa.me/' . $wa . '?text=' . rawurlencode(implode("\n", $lines)),
  ]);
} catch (Throwable $e) {
  if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
  sv_json(['ok' => false, 'error' => 'No se pudo guardar el pedido'], 500);
}
