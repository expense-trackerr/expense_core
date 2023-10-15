-- Makes the transaction id case sensitive

ALTER TABLE transaction MODIFY id VARCHAR(191) COLLATE utf8_bin NOT NULL;