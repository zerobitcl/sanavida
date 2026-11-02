<?php
// Preferido: /domains/sanavidakefir.cl/config.local.php (fuera de public_html → sobrevive al deploy).
// Alternativa: api/config.local.php (se borra si el deploy Git limpia public_html).
// No subir a git.
return [
  'api2pdf_key' => 'TU-API-KEY',
  'unit_price' => 7500,
  'whatsapp' => '56979848821',
  'ops_pin' => '8210',
  'db' => [
    'host' => '127.0.0.1',
    'port' => 3306,
    'name' => 'u739953844_sanavida',
    'user' => 'u739953844_sanavida',
    'password' => 'TU-PASSWORD',
  ],
];
