ALTER TABLE record_compositions
DROP CONSTRAINT record_compositions_record_id_fkey,
ADD CONSTRAINT record_compositions_record_id_fkey
FOREIGN KEY (record_id) REFERENCES records(id) ON DELETE CASCADE;


ALTER TABLE ensemble_musician
DROP CONSTRAINT ensemble_musician_ensemble_id_fkey,
ADD CONSTRAINT ensemble_musician_ensemble_id_fkey
FOREIGN KEY (ensemble_id) REFERENCES ensembles(id) ON DELETE CASCADE;