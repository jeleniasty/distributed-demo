CREATE TABLE api_key
(
    id         BIGSERIAL PRIMARY KEY,
    username   VARCHAR(50),
    api_key    VARCHAR(255),

    created_at TIMESTAMP,
    created_by VARCHAR(255),
    updated_at TIMESTAMP,
    updated_by VARCHAR(255)
);

CREATE INDEX idx_api_key
    ON api_key (api_key);