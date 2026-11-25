# 03 — Modelo entidad-relación preliminar

**Convenciones** [Recomendación]
- Todas las tablas de negocio llevan `tenant_id` (RLS), `id` UUIDv7, `created_at`, `created_by`, `version` (bloqueo optimista).
- Montos en `NUMERIC(14,4)` con `currency_code`; cantidades de inventario en `NUMERIC(14,6)`.
- Tablas de hechos (pedidos, pagos, movimientos, comprobantes) son **append-only**; correcciones = nuevos registros.
- Configuración con vigencia: `valid_from`, `valid_to`, `config_version`.
- Atributos dependientes del país o del canal en `JSONB` validado por esquema (p. ej. `fiscal_metadata`, `external_payload`).

Por legibilidad, el modelo se divide en 6 dominios. Las relaciones entre dominios se indican con la entidad compartida.

## 1. Organización, seguridad y auditoría

```mermaid
erDiagram
  TENANT ||--o{ BRAND : posee
  TENANT ||--o{ LEGAL_ENTITY : "razón social"
  BRAND ||--o{ BRAND_FORMAT : opera
  FORMAT ||--o{ BRAND_FORMAT : clasifica
  LEGAL_ENTITY ||--o{ BRANCH : "emite por"
  BRANCH ||--o{ BRANCH_BRAND_FORMAT : aloja
  BRAND_FORMAT ||--o{ BRANCH_BRAND_FORMAT : "se ofrece en"
  BRANCH ||--o{ AREA : contiene
  AREA ||--o{ DINING_TABLE : contiene
  BRANCH ||--o{ TERMINAL : registra
  BRANCH ||--o{ WAREHOUSE : tiene
  BRANCH ||--o{ KITCHEN_STATION : tiene
  BRANCH ||--|| EDGE_HUB : "es servida por"
  USER ||--o{ USER_ROLE_SCOPE : tiene
  ROLE ||--o{ USER_ROLE_SCOPE : asigna
  ROLE ||--o{ ROLE_PERMISSION : incluye
  PERMISSION ||--o{ ROLE_PERMISSION : "es parte de"
  USER ||--o{ AUDIT_LOG : genera

  LEGAL_ENTITY {
    uuid id PK
    string country_code
    string tax_id
    string legal_name
    string tax_regime
    jsonb fiscal_metadata
  }
  BRANCH {
    uuid id PK
    uuid legal_entity_id FK
    string name
    string timezone
    string fiscal_establishment_code
    geography location
  }
  TERMINAL {
    uuid id PK
    uuid branch_id FK
    string type "POS|KDS|KIOSK|MOBILE"
    string device_fingerprint
    string status
  }
  USER_ROLE_SCOPE {
    uuid user_id FK
    uuid role_id FK
    string scope_type "TENANT|BRAND|FORMAT|BRANCH"
    uuid scope_id
  }
  AUDIT_LOG {
    uuid id PK
    uuid user_id FK
    uuid approver_id
    uuid terminal_id
    string action
    string entity_type
    uuid entity_id
    jsonb before_after
    string prev_hash
    string hash
    timestamptz at
  }
```

## 2. Catálogo, precios, impuestos y reglas

```mermaid
erDiagram
  CATEGORY ||--o{ PRODUCT : agrupa
  PRODUCT ||--o{ PRODUCT_VARIANT : "se expone como"
  PRODUCT ||--o{ PRODUCT_MODIFIER_GROUP : admite
  MODIFIER_GROUP ||--o{ PRODUCT_MODIFIER_GROUP : "se usa en"
  MODIFIER_GROUP ||--o{ MODIFIER : contiene
  PRODUCT ||--o{ COMBO_SLOT : "es combo con"
  COMBO_SLOT ||--o{ COMBO_SLOT_OPTION : ofrece
  MENU ||--o{ MENU_ITEM : publica
  PRODUCT_VARIANT ||--o{ MENU_ITEM : aparece
  MENU ||--o{ MENU_SCHEDULE : "disponible en"
  PRICE_LIST ||--o{ PRICE_LIST_ITEM : contiene
  PRODUCT_VARIANT ||--o{ PRICE_LIST_ITEM : "tiene precio"
  TAX_CATEGORY ||--o{ PRODUCT : clasifica
  TAX_CATEGORY ||--o{ TAX_RULE : "se grava por"
  RULE ||--o{ RULE_CONDITION : evalua
  RULE ||--o{ RULE_ACTION : ejecuta
  CHANNEL ||--o{ MENU : "vende por"

  PRODUCT {
    uuid id PK
    string sku
    string name
    uuid category_id FK
    uuid tax_category_id FK
    string type "SIMPLE|COMBO|MODIFIER_ONLY"
    uuid default_station_id
  }
  PRODUCT_VARIANT {
    uuid id PK
    uuid product_id FK
    uuid brand_id
    uuid format_id
    uuid branch_id "nullable"
    uuid channel_id "nullable"
    string display_name
    bool available
  }
  PRICE_LIST {
    uuid id PK
    uuid brand_id
    uuid format_id "nullable"
    uuid branch_id "nullable"
    uuid channel_id "nullable"
    string daypart "nullable"
    int priority
    date valid_from
    date valid_to
  }
  TAX_RULE {
    uuid id PK
    string country_code
    string tax_regime
    uuid tax_category_id FK
    string operation_type
    string tax_code
    numeric rate
    string affectation_code
    date valid_from
    date valid_to
  }
  RULE {
    uuid id PK
    string type "PROMO|COMBO|SURCHARGE|COMMISSION|COUPON"
    int priority
    bool stackable
    string exclusive_group
    jsonb scope
    timestamptz valid_from
    timestamptz valid_to
  }
  CHANNEL {
    uuid id PK
    string code "DINE_IN|BAR|COUNTER|PICKUP|OWN_DELIVERY|AGGREGATOR_X|WEB"
    uuid integration_id "nullable"
  }
```

## 3. Recetas e inventario

```mermaid
erDiagram
  INGREDIENT ||--o{ RECIPE_LINE : "se usa en"
  RECIPE ||--o{ RECIPE_LINE : compone
  RECIPE ||--o| RECIPE : "sub-receta"
  PRODUCT_VARIANT ||--o| RECIPE : "se prepara con"
  MODIFIER ||--o| RECIPE : "agrega"
  INGREDIENT ||--o{ UNIT_CONVERSION : convierte
  WAREHOUSE ||--o{ STOCK_BALANCE : mantiene
  INGREDIENT ||--o{ STOCK_BALANCE : "saldo de"
  WAREHOUSE ||--o{ STOCK_MOVEMENT : registra
  INGREDIENT ||--o{ STOCK_MOVEMENT : mueve
  TRANSFER ||--o{ TRANSFER_LINE : detalla
  WAREHOUSE ||--o{ TRANSFER : "origen/destino"
  PRODUCTION_ORDER ||--o{ STOCK_MOVEMENT : genera
  PHYSICAL_COUNT ||--o{ PHYSICAL_COUNT_LINE : detalla

  INGREDIENT {
    uuid id PK
    string code
    string name
    string base_unit
    numeric min_stock
    numeric reorder_point
  }
  RECIPE_LINE {
    uuid recipe_id FK
    uuid ingredient_id FK
    uuid sub_recipe_id "nullable"
    numeric quantity
    string unit
    numeric waste_pct
  }
  STOCK_BALANCE {
    uuid warehouse_id FK
    uuid ingredient_id FK
    numeric qty
    numeric avg_cost
    timestamptz updated_at
  }
  STOCK_MOVEMENT {
    uuid id PK
    uuid warehouse_id FK
    uuid ingredient_id FK
    string type "PURCHASE|SALE|PRODUCTION|TRANSFER_OUT|TRANSFER_IN|WASTE|ADJUST"
    numeric qty
    numeric unit_cost
    string reason
    string source_type
    uuid source_id
    timestamptz at
  }
  TRANSFER {
    uuid id PK
    uuid from_warehouse_id
    uuid to_warehouse_id
    string status "DRAFT|SENT|RECEIVED|DISCREPANCY"
  }
```

## 4. Pedidos, cocina y delivery

```mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : realiza
  CUSTOMER ||--o{ CUSTOMER_ADDRESS : tiene
  ORDER ||--o{ ORDER_LINE : contiene
  ORDER_LINE ||--o{ ORDER_LINE_MODIFIER : personaliza
  ORDER_LINE ||--o{ ORDER_LINE_ADJUSTMENT : "descuento/recargo"
  ORDER ||--o{ ORDER_EVENT : historial
  ORDER ||--o{ CHECK : "se divide en"
  CHECK ||--o{ CHECK_LINE : asigna
  ORDER_LINE ||--o{ CHECK_LINE : "se cobra en"
  DINING_TABLE ||--o{ ORDER : atiende
  ORDER ||--o{ KITCHEN_TICKET : genera
  KITCHEN_TICKET ||--o{ KITCHEN_TICKET_ITEM : contiene
  KITCHEN_STATION ||--o{ KITCHEN_TICKET : recibe
  ORDER ||--o| DELIVERY : "se entrega por"
  DELIVERY_ZONE ||--o{ DELIVERY : cubre
  COURIER ||--o{ DELIVERY : realiza
  DELIVERY ||--o{ DELIVERY_EVENT : traza
  ORDER ||--o| EXTERNAL_ORDER : "proviene de"
  INTEGRATION ||--o{ EXTERNAL_ORDER : recibe

  ORDER {
    uuid id PK
    uuid branch_id
    uuid brand_id
    uuid format_id
    uuid channel_id
    uuid table_id "nullable"
    uuid customer_id "nullable"
    string status
    string service_type "DINE_IN|TAKEAWAY|DELIVERY|PICKUP"
    timestamptz scheduled_for "nullable"
    timestamptz promised_at
    int config_version
    numeric subtotal
    numeric discount_total
    numeric surcharge_total
    numeric tax_total
    numeric total
    uuid correlation_id
  }
  ORDER_LINE {
    uuid id PK
    uuid order_id FK
    uuid product_variant_id
    numeric qty
    numeric unit_price
    jsonb tax_breakdown
    string status "ACTIVE|VOIDED"
    string void_reason
    uuid station_id
    int course
  }
  EXTERNAL_ORDER {
    uuid id PK
    uuid integration_id FK
    string external_id UK
    string external_status
    jsonb raw_payload
    numeric commission_expected
  }
  DELIVERY {
    uuid id PK
    uuid order_id FK
    uuid zone_id FK
    uuid courier_id
    string status
    numeric fee
    timestamptz eta
    numeric cash_to_collect
  }
  KITCHEN_TICKET {
    uuid id PK
    uuid order_id FK
    uuid station_id FK
    int priority_score
    string status "QUEUED|IN_PROGRESS|READY|BUMPED|CANCELLED"
    timestamptz started_at
    timestamptz ready_at
  }
```

## 5. Caja, pagos y facturación electrónica

```mermaid
erDiagram
  TERMINAL ||--o{ CASH_SESSION : abre
  USER ||--o{ CASH_SESSION : opera
  CASH_SESSION ||--o{ CASH_MOVEMENT : registra
  CASH_SESSION ||--o{ PAYMENT : recibe
  CHECK ||--o{ PAYMENT : "se paga con"
  PAYMENT_METHOD ||--o{ PAYMENT : clasifica
  PAYMENT ||--o{ TIP : incluye
  CASH_SESSION ||--o{ CASH_COUNT : arquea
  CHECK ||--o| FISCAL_DOCUMENT : "se documenta en"
  FISCAL_DOCUMENT ||--o{ FISCAL_DOCUMENT_LINE : detalla
  FISCAL_DOCUMENT ||--o{ FISCAL_DOCUMENT : "nota referencia a"
  FISCAL_SERIES ||--o{ FISCAL_DOCUMENT : numera
  FISCAL_SERIES ||--o{ SERIES_RANGE_RESERVATION : reserva
  TERMINAL ||--o{ SERIES_RANGE_RESERVATION : usa
  FISCAL_DOCUMENT ||--o{ FISCAL_SUBMISSION : envia
  FISCAL_DOCUMENT_TYPE ||--o{ FISCAL_SERIES : define
  FISCAL_SUMMARY ||--o{ FISCAL_DOCUMENT : agrupa

  CASH_SESSION {
    uuid id PK
    uuid terminal_id FK
    uuid user_id FK
    numeric opening_float
    numeric expected_cash
    numeric declared_cash
    numeric difference
    string status "OPEN|CLOSING|CLOSED|APPROVED"
    timestamptz opened_at
    timestamptz closed_at
  }
  PAYMENT {
    uuid id PK
    uuid check_id FK
    uuid cash_session_id FK
    uuid method_id FK
    numeric amount
    numeric tendered
    numeric change
    string currency_code
    string provider_ref
    string card_last4
    string status "CAPTURED|REFUNDED|VOIDED|PENDING"
  }
  FISCAL_SERIES {
    uuid id PK
    uuid legal_entity_id
    uuid branch_id
    uuid document_type_id FK
    string series_code
    uuid channel_id "nullable"
    uuid terminal_id "nullable"
    bigint last_number
    bool contingency
  }
  FISCAL_DOCUMENT {
    uuid id PK
    uuid series_id FK
    bigint number
    string document_type_code
    uuid reference_document_id "nullable"
    string customer_doc_type
    string customer_doc_number
    string customer_name
    numeric taxable_base
    jsonb taxes
    numeric total
    string currency_code
    string status "DRAFT|ISSUED_LOCAL|SENT|ACCEPTED|ACCEPTED_WITH_OBS|REJECTED|VOIDED"
    string hash_or_digest
    string qr_payload
    string xml_uri
    string receipt_uri
    timestamptz issued_at
    jsonb fiscal_metadata
  }
  FISCAL_SUBMISSION {
    uuid id PK
    uuid fiscal_document_id FK
    string provider
    int attempt
    string request_uri
    string response_code
    string response_message
    timestamptz at
  }
```

Restricciones fiscales clave: `UNIQUE(series_id, number)`; `FISCAL_DOCUMENT` no admite `UPDATE` de campos económicos una vez emitido (trigger); toda modificación es nota de crédito/débito o anulación según reglas del país.

## 6. Clientes, fidelización e integraciones

```mermaid
erDiagram
  CUSTOMER ||--o{ CUSTOMER_TAX_PROFILE : "datos fiscales"
  CUSTOMER ||--o{ CONSENT : otorga
  CUSTOMER ||--o| LOYALTY_ACCOUNT : participa
  LOYALTY_ACCOUNT ||--o{ LOYALTY_LEDGER : movimientos
  LOYALTY_PROGRAM ||--o{ LOYALTY_ACCOUNT : agrupa
  COUPON ||--o{ COUPON_REDEMPTION : canjea
  CUSTOMER ||--o{ COUPON_REDEMPTION : usa
  INTEGRATION ||--o{ INTEGRATION_CREDENTIAL : autentica
  INTEGRATION ||--o{ INTEGRATION_MESSAGE : intercambia
  INTEGRATION ||--o{ SETTLEMENT : liquida
  SETTLEMENT ||--o{ SETTLEMENT_LINE : detalla
  SETTLEMENT_LINE }o--o| EXTERNAL_ORDER : concilia

  CUSTOMER {
    uuid id PK
    string phone
    string email
    string name
    jsonb preferences
    string segment
  }
  INTEGRATION {
    uuid id PK
    string kind "AGGREGATOR|FISCAL|PAYMENT|MESSAGING|MAPS"
    string adapter_code
    string adapter_version
    jsonb settings
    string status
  }
  INTEGRATION_MESSAGE {
    uuid id PK
    uuid integration_id FK
    string direction "IN|OUT"
    string idempotency_key UK
    jsonb payload
    string status "RECEIVED|PROCESSED|FAILED|DLQ"
    int attempts
  }
  SETTLEMENT_LINE {
    uuid id PK
    uuid settlement_id FK
    string external_order_id
    numeric gross
    numeric commission
    numeric promo_funded_by_platform
    numeric promo_funded_by_restaurant
    numeric net
    string match_status "MATCHED|DIFFERENCE|MISSING_IN_POS|MISSING_IN_SETTLEMENT"
  }
```

## 7. Volumetría preliminar [Estimación]

Base: 10 sucursales × 800 pedidos/día × 4 líneas/pedido.

| Tabla | Filas/día | Filas/año | Estrategia |
|---|---|---|---|
| ORDER | 8.000 | ~2,9 M | Partición mensual |
| ORDER_LINE | 32.000 | ~11,7 M | Partición mensual |
| ORDER_EVENT | ~64.000 | ~23 M | Partición mensual; archivado a frío > 24 meses |
| STOCK_MOVEMENT | ~100.000 (consumo por insumo) | ~36 M | Partición mensual; consumo agregado por pedido como alternativa |
| FISCAL_DOCUMENT | ~8.500 | ~3,1 M | Partición anual; retención según ley [Requiere validación del plazo] |

Volúmenes manejables en una sola instancia PostgreSQL bien dimensionada durante los primeros años.
