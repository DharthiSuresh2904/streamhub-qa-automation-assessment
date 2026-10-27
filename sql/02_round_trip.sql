-- Forward transfer followed by reverse within 24 hours and reverse amount within 10% of original.
-- Ordering by transfer id on equal timestamps avoids duplicate time ties.
SELECT a.id AS outgoing_id, b.id AS return_id, a.from_account AS account_a,
       a.to_account AS account_b, a.amount AS amount_sent, b.amount AS amount_returned,
       a.transferred_at AS sent_at, b.transferred_at AS returned_at
FROM transfers a JOIN transfers b
 ON a.from_account=b.to_account AND a.to_account=b.from_account
 AND (julianday(b.transferred_at)-julianday(a.transferred_at))*24 BETWEEN 0 AND 24
 AND (b.transferred_at>a.transferred_at OR (b.transferred_at=a.transferred_at AND b.id>a.id))
 AND b.amount BETWEEN a.amount*0.9 AND a.amount*1.1
ORDER BY a.id,b.id;
