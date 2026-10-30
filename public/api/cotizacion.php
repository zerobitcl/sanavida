<?php
/**
 * Cotización PDF vía Api2Pdf — para Hostinger (PHP).
 * El front llama POST /api/cotizacion (rewrite → este archivo).
 */
require_once __DIR__ . '/db.php';

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

$cfgFile = __DIR__ . '/config.local.php';
if (!is_file($cfgFile)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Falta api/config.local.php en el servidor']);
  exit;
}
$cfg = require $cfgFile;
$key = $cfg['api2pdf_key'] ?? '';
$unit = isset($cfg['unit_price']) ? (int) $cfg['unit_price'] : 7500;
$wa = preg_replace('/\D+/', '', (string) ($cfg['whatsapp'] ?? '56900000000'));

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);
if (!is_array($input)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'JSON inválido']);
  exit;
}

// Herramienta interna: exige la misma clave del dashboard.
sv_require_ops($input);

$empresa = trim((string) ($input['empresa'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
if ($empresa === '' || $email === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nombre/empresa y email son obligatorios']);
  exit;
}

$telefono = trim((string) ($input['telefono'] ?? ''));
$tipo = trim((string) ($input['tipo'] ?? ''));
$cantidad = trim((string) ($input['cantidad'] ?? ''));
$detalle = trim((string) ($input['detalle'] ?? ''));

$tipos = [
  'mayorista' => 'Mayorista / revendedor',
  'evento' => 'Evento / catering',
  'empresa' => 'Empresa / wellness',
  'otro' => 'Otro',
];
$tipoLabel = $tipos[$tipo] ?? ($tipo !== '' ? $tipo : '—');

$id = 'SV-' . date('Ymd') . '-' . random_int(1000, 9999);
$today = date('d/m/Y');
if (class_exists('IntlDateFormatter')) {
  $fmt = new IntlDateFormatter('es_CL', IntlDateFormatter::LONG, IntlDateFormatter::NONE);
  $today = $fmt->format(new DateTime()) ?: $today;
}

$logoPath = dirname(__DIR__) . '/img/brand/logo-480.png';
$logoUri = '';
if (is_file($logoPath)) {
  $logoUri = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
}

$qtyNum = (int) preg_replace('/\D+/', '', $cantidad);
if ($qtyNum < 1) $qtyNum = 1;
$qtyLabel = $cantidad !== '' ? $cantidad : ($qtyNum . ' botella(s)');
$subtotal = $unit * $qtyNum;
$clp = static function (int $n): string {
  return '$' . number_format($n, 0, ',', '.');
};

$e = static function (string $s): string {
  return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$html = '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Cotización ' . $e($id) . '</title>
<style>
@page{size:A4;margin:0}
*{box-sizing:border-box}
body{margin:0;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;color:#2a1030;font-size:11.5px;line-height:1.45;background:#fffcf8}
.page{padding:28px 32px 36px;position:relative}
.page:before{content:"";position:absolute;left:0;right:0;top:0;height:8px;background:linear-gradient(90deg,#4a2574,#d81b60 55%,#f59e0b)}
.top{display:flex;justify-content:space-between;gap:24px;padding-top:12px;margin-bottom:28px}
.brand img{height:64px;width:auto;display:block}
.tag{margin-top:6px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#6b5670;font-weight:600}
.meta{text-align:right}
.doc{font-size:22px;font-weight:700;color:#4a2574;margin:0 0 4px}
.qid{font-size:13px;font-weight:600;color:#d81b60;margin:0 0 8px}
.meta p{margin:0;color:#6b5670;font-size:10.5px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:22px}
.card{background:#fff;border:1px solid #e7d8e6;border-radius:14px;padding:14px 16px}
.card h2{margin:0 0 8px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#4a2574}
.intro{margin:0 0 18px;padding:14px 16px;border-radius:14px;background:linear-gradient(135deg,#faf3f8,#eef7fd);border:1px solid #e7d8e6}
table{width:100%;border-collapse:collapse;margin:0 0 18px;background:#fff}
th{background:#4a2574;color:#fff;text-align:left;font-size:9px;letter-spacing:.1em;text-transform:uppercase;padding:10px 12px}
td{padding:12px;border-bottom:1px solid #e7d8e6;vertical-align:top}
.num{text-align:right;white-space:nowrap}
.item{font-weight:700;color:#4a2574;margin:0 0 2px}
.sub{margin:0;color:#6b5670;font-size:10.5px}
.totals{margin-left:auto;width:260px;border:1px solid #e7d8e6;border-radius:14px;overflow:hidden;margin-bottom:22px;background:#fff}
.totals div{display:flex;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #e7d8e6}
.totals div:last-child{border:0;background:#4a2574;color:#fff;font-weight:700;padding:12px 14px}
.terms h2{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#4a2574}
.terms li{font-size:10.5px;color:#6b5670;margin-bottom:4px}
.foot{margin-top:28px;padding-top:12px;border-top:1px solid #e7d8e6;font-size:9.5px;color:#6b5670;display:flex;justify-content:space-between}
</style></head><body><div class="page">
<header class="top"><div class="brand">'
  . ($logoUri !== '' ? '<img src="' . $logoUri . '" alt="SanaVida" width="180" height="120">' : '<div style="font-size:28px;font-weight:700;color:#4a2574">SANAVIDA</div>')
  . '<div class="tag">Alimenta hoy tu bienestar de mañana</div></div>
<div class="meta"><p class="doc">COTIZACIÓN</p><p class="qid">' . $e($id) . '</p>
<p>Fecha: ' . $e($today) . '</p><p>Válida por 15 días</p><p>Ovalle, IV Región</p></div></header>
<div class="grid">
<div class="card"><h2>Cliente</h2><p><strong>' . $e($empresa) . '</strong></p><p>' . $e($email) . '</p>'
  . ($telefono !== '' ? '<p>' . $e($telefono) . '</p>' : '')
  . '<p>Tipo: ' . $e($tipoLabel) . '</p></div>
<div class="card"><h2>Emisor</h2><p><strong>SanaVida</strong></p><p>Inversiones Vitalia SpA</p><p>RUT 78.516.946-8</p>
<p>Daniel Riquelme 735, Ovalle</p><p>WhatsApp +' . $e($wa) . '</p></div></div>
<p class="intro">Gracias por tu interés en el <strong>kéfir natural SanaVida</strong>: cultivo vivo, sin pasteurizar, 100% natural. Cotización lista para confirmar con Paola.</p>
<table><thead><tr><th>Descripción</th><th class="num">Cantidad</th><th class="num">P. unitario</th><th class="num">Total</th></tr></thead>
<tbody><tr><td><p class="item">kéfir natural SanaVida</p><p class="sub">1 L · Sabor Natural · Botella · Búlgaros vivos</p></td>
<td class="num">' . $e($qtyLabel) . '</td><td class="num">' . $e($clp($unit)) . '</td>
<td class="num"><strong>' . $e($clp($subtotal)) . '</strong></td></tr>'
  . ($detalle !== '' ? '<tr><td colspan="4"><p class="sub"><strong>Detalle:</strong> ' . $e($detalle) . '</p></td></tr>' : '')
  . '</tbody></table>
<div class="totals"><div><span>Subtotal</span><span>' . $e($clp($subtotal)) . '</span></div>
<div><span>Despacho</span><span>Según comuna / ruta</span></div>
<div><span>Total estimado</span><span>' . $e($clp($subtotal)) . '</span></div></div>
<div class="terms"><h2>Condiciones</h2><ul>
<li>Precio unitario referencial: ' . $e($clp($unit)) . ' CLP por botella 1 L.</li>
<li>Producto refrigerado 4°–8°C. Consumir preferentemente en 7–10 días.</li>
<li>Entregas en Ovalle y rutas consolidadas en la IV Región.</li>
<li>Validez 15 días · sujeta a disponibilidad de elaboración · Res. SEREMI N.º 2604496921.</li>
</ul></div>
<div class="foot"><span>@sanavida_kefir</span><span>Inversiones Vitalia SpA · 78.516.946-8</span></div>
</div></body></html>';

$payload = json_encode([
  'html' => $html,
  'fileName' => 'Cotizacion-' . $id . '-SanaVida.pdf',
  'inlinePdf' => true,
  'options' => [
    'printBackground' => true,
    'preferCSSPageSize' => true,
    'marginTop' => '0.4in',
    'marginBottom' => '0.45in',
    'marginLeft' => '0.4in',
    'marginRight' => '0.4in',
  ],
], JSON_UNESCAPED_UNICODE);

$ch = curl_init('https://v2.api2pdf.com/chrome/pdf/html');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: ' . $key,
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => $payload,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 60,
]);
$resBody = curl_exec($ch);
$errno = curl_errno($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($errno || $resBody === false) {
  http_response_code(502);
  echo json_encode(['ok' => false, 'error' => 'No se pudo contactar Api2Pdf']);
  exit;
}

$data = json_decode($resBody, true);
$fileUrl = is_array($data) ? ($data['FileUrl'] ?? null) : null;
if ($status >= 400 || !$fileUrl) {
  $msg = is_array($data) ? ($data['Error'] ?? $data['message'] ?? 'Error Api2Pdf') : 'Error Api2Pdf';
  http_response_code(502);
  echo json_encode(['ok' => false, 'error' => $msg]);
  exit;
}

$clientWa = preg_replace('/\D+/', '', $telefono);
if (strlen($clientWa) === 9 && str_starts_with($clientWa, '9')) {
  $clientWa = '56' . $clientWa;
}
if ($clientWa === '') {
  $clientWa = $wa;
}

$waText = "Hola {$empresa}, te envío la cotización {$id} de SanaVida (kéfir natural).\n"
  . ($cantidad !== '' ? "• Cantidad: {$cantidad}\n" : '')
  . "• PDF: {$fileUrl}\n"
  . "Cualquier duda, me escribes por aquí 😊";

$quoteNumber = 1;
$isReturning = false;
try {
  $phoneKey = sv_phone($telefono);
  if ($phoneKey !== '') {
    $pdo = sv_pdo();
    $pdo->beginTransaction();
    [$client] = sv_upsert_client($pdo, $phoneKey, $empresa, $email);
    $quoteNumber = ((int) $client['quotes_count']) + 1;
    $isReturning = $quoteNumber > 1;
    $now = (new DateTimeImmutable('now', new DateTimeZone('America/Santiago')))->format('Y-m-d H:i:s');
    $ins = $pdo->prepare('INSERT INTO quotes (client_id, phone, quote_code, empresa, email, tipo, cantidad, detalle, unit_price, pdf_url, quote_number, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
    $ins->execute([
      (int) $client['id'],
      $phoneKey,
      $id,
      $empresa,
      $email,
      $tipo,
      $cantidad,
      $detalle !== '' ? $detalle : null,
      $unit,
      $fileUrl,
      $quoteNumber,
      $now,
    ]);
    $pdo->prepare('UPDATE clients SET quotes_count = quotes_count + 1, last_seen_at = ? WHERE id = ?')->execute([$now, $client['id']]);
    $pdo->commit();
  }
} catch (Throwable $e) {
  if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
  // El PDF ya se generó; no fallamos la respuesta por un error de historial.
}

echo json_encode([
  'ok' => true,
  'id' => $id,
  'fileUrl' => $fileUrl,
  'waUrl' => 'https://wa.me/' . $clientWa . '?text=' . rawurlencode($waText),
  'quoteNumber' => $quoteNumber,
  'isReturning' => $isReturning,
], JSON_UNESCAPED_UNICODE);
