-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "nome_fantasia" STRING;
ALTER TABLE "Empresa" ALTER COLUMN "cnpj" DROP NOT NULL;
