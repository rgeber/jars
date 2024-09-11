-- ########################################################################
DEFINE TABLE pickle SCHEMAFULL
  PERMISSIONS FOR select, update, delete, create
  WHERE
    $scope = "user"
    -- FIXME: Change this to YOUR audience value
    AND $token.aud CONTAINS "6yeybrBPYSNdaXsuqujiVIn87Mj1OsUpeHd3yKlZ"

    -- The owner's email claim must match the email of the user being queried.
    AND ownerEmail = $token['https://surrealdb.com/email']
    --AND owner = "user:⟨" + $token['https://surrealdb.com/email'] + "⟩"
;

DEFINE FIELD type ON pickle TYPE string;
DEFINE FIELD value ON pickle TYPE option<string>;
DEFINE FIELD jar ON pickle TYPE record;
DEFINE FIELD owner ON pickle TYPE record;
DEFINE FIELD ownerEmail ON pickle TYPE string;
DEFINE FIELD creationDate ON pickle TYPE datetime DEFAULT time::now();