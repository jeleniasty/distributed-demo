CREATE TABLE "record"
(
    id          BIGSERIAL  PRIMARY KEY,
    description VARCHAR(255),

    created_at  TIMESTAMP,
    created_by  VARCHAR(255),
    updated_at  TIMESTAMP,
    updated_by  VARCHAR(255)
);