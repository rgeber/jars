-- ########################################################################
DEFINE TABLE jar SCHEMAFULL
  PERMISSIONS FOR select, update, delete, create
  WHERE
    $scope = "user"
    -- FIXME: Change this to YOUR audience value
    AND $token.aud CONTAINS "6yeybrBPYSNdaXsuqujiVIn87Mj1OsUpeHd3yKlZ"

    -- The owner's email claim must match the email of the user being queried.
    AND ownerEmail = $token['https://surrealdb.com/email']
    --AND owner = "user:⟨" + $token['https://surrealdb.com/email'] + "⟩"
;

DEFINE FIELD title ON jar TYPE string;
DEFINE FIELD owner ON jar TYPE record;
DEFINE FIELD ownerEmail ON jar TYPE string;
DEFINE FIELD creationDate ON jar TYPE datetime DEFAULT time::now();