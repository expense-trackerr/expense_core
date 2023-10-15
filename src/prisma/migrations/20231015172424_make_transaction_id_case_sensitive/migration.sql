
-- Makes the transaction id column case sensitive
ALTER TABLE transaction MODIFY id VARCHAR(255) COLLATE utf8_bin;
