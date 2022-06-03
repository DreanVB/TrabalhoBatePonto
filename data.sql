CREATE TABLE "usuarios" (
  "login" varchar(100) DEFAULT NULL,
  "senha" varchar(100) DEFAULT NULL,
  "id" varchar(100) DEFAULT NULL
) 
CREATE TABLE "pontos" (
  "entrada1" time DEFAULT NULL,
  "saida1" time DEFAULT NULL,
  "entrada2" time DEFAULT NULL,
  "saida2" time DEFAULT NULL,
  "data" date DEFAULT NULL,
  "idFolha" varchar(100) DEFAULT NULL,
  "id" varchar(100) DEFAULT NULL,
  "horasTrabalhadas" varchar(12) DEFAULT NULL
) 
CREATE TABLE "folhas" (
  "nome" varchar(100) DEFAULT NULL,
  "cpf" varchar(100) DEFAULT NULL,
  "idUsuario" varchar(100) DEFAULT NULL,
  "id" varchar(100) DEFAULT NULL
)