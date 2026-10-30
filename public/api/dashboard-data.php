<?php
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, X-Ops-Pin');
  http_response_code(204);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
  if ($method === 'GET') {
    sv_require_ops();
    $pdo = sv_pdo();

    $dayStart = (new DateTimeImmutable('today', new DateTimeZone('America/Santiago')))->format('Y-m-d H:i:s');
    $stToday = $pdo->prepare('SELECT COUNT(*) FROM orders WHERE created_at >= ?');
    $stToday->execute([$dayStart]);

    $stOpen = $pdo->query("SELECT COUNT(*) FROM orders WHERE status NOT IN ('entregado','cancelado')");

    $kpis = [
      'clients' => (int) $pdo->query('SELECT COUNT(*) FROM clients')->fetchColumn(),
      'orders' => (int) $pdo->query('SELECT COUNT(*) FROM orders')->fetchColumn(),
      'quotes' => (int) $pdo->query('SELECT COUNT(*) FROM quotes')->fetchColumn(),
      'orders_today' => (int) $stToday->fetchColumn(),
      'orders_open' => (int) $stOpen->fetchColumn(),
    ];

    $clients = $pdo->query('SELECT id, phone, name, email, orders_count, quotes_count, first_seen_at, last_seen_at FROM clients ORDER BY last_seen_at DESC LIMIT 100')->fetchAll();
    $orders = $pdo->query('SELECT o.id, o.client_id, o.phone, o.name, o.comuna, o.cantidad, o.entrega, o.notas, o.order_number, o.status, o.created_at, c.orders_count AS client_orders_total FROM orders o LEFT JOIN clients c ON c.id = o.client_id ORDER BY o.created_at DESC LIMIT 100')->fetchAll();
    $quotes = $pdo->query('SELECT q.id, q.client_id, q.phone, q.quote_code, q.empresa, q.email, q.tipo, q.cantidad, q.detalle, q.unit_price, q.pdf_url, q.quote_number, q.created_at FROM quotes q ORDER BY q.created_at DESC LIMIT 100')->fetchAll();

    sv_json([
      'ok' => true,
      'statuses' => sv_order_statuses(),
      'kpis' => $kpis,
      'clients' => $clients,
      'orders' => $orders,
      'quotes' => $quotes,
    ]);
  }

  if ($method === 'POST') {
    $input = sv_read_json();
    sv_require_ops($input);
    $action = (string) ($input['action'] ?? '');

    if ($action === 'set_status') {
      $orderId = (int) ($input['orderId'] ?? 0);
      $status = trim((string) ($input['status'] ?? ''));
      if ($orderId < 1 || !in_array($status, sv_order_statuses(), true)) {
        sv_json(['ok' => false, 'error' => 'Pedido o estado inválido'], 400);
      }
      $pdo = sv_pdo();
      $st = $pdo->prepare('UPDATE orders SET status = ? WHERE id = ?');
      $st->execute([$status, $orderId]);
      if ($st->rowCount() < 1) {
        // Puede ser el mismo valor; verificar existencia.
        $check = $pdo->prepare('SELECT id, status FROM orders WHERE id = ?');
        $check->execute([$orderId]);
        $row = $check->fetch();
        if (!$row) sv_json(['ok' => false, 'error' => 'Pedido no encontrado'], 404);
      }
      sv_json(['ok' => true, 'orderId' => $orderId, 'status' => $status]);
    }

    sv_json(['ok' => false, 'error' => 'Acción no reconocida'], 400);
  }

  sv_json(['ok' => false, 'error' => 'Método no permitido'], 405);
} catch (Throwable $e) {
  sv_json(['ok' => false, 'error' => 'No se pudo cargar el panel', 'detail' => $e->getMessage()], 500);
}
