-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "image" STRING,
    "email" STRING,
    "emailVerified" TIMESTAMP(3),
    "token" STRING,
    "password" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" STRING NOT NULL,
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING,
    "responsavel_tecnico" STRING,
    "registro_responsavel_tecnico" STRING,
    "habilitacao_responsavel_tecnico" STRING,
    "ramo_atividade" STRING,
    "atividade_principal" STRING,
    "cnae" STRING,
    "grau_risco" STRING,
    "nome_gestor_contrato" STRING,
    "telefone_gestor_contrato" STRING,
    "email_gestor_contrato" STRING,
    "razao_social" STRING,
    "ergonomista" STRING,
    "ie" STRING,
    "cep" STRING,
    "setor" STRING,
    "endereco" STRING,
    "bairro" STRING,
    "telefone" STRING,
    "unidadeName" STRING,
    "areaavaliadaName" STRING,
    "cnpj" STRING NOT NULL,
    "cidade" STRING,
    "estado" STRING,
    "userId" STRING NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plano" (
    "id" STRING NOT NULL,
    "namePlano" STRING,
    "unidadeName" STRING,
    "areaavaliadaName" STRING,
    "o_que_fazer" STRING,
    "legislacao" STRING,
    "origem_demanda" STRING,
    "onde" STRING,
    "porque" STRING,
    "responsavel" STRING,
    "quando" STRING,
    "prazo" STRING,
    "previsao_termino" TIMESTAMP(3),
    "termino_real" TIMESTAMP(3),
    "status" STRING,
    "evidencia" STRING,
    "empresaId" STRING,
    "area_avaliadaId" STRING,
    "unidadeId" STRING,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risco" (
    "id" STRING NOT NULL,
    "nameRisco" STRING,
    "unidadeName" STRING,
    "areaavaliadaName" STRING,
    "sugestacao_recomendacao" STRING,
    "medidas_controle" STRING,
    "necessita_aet" BOOL,
    "classificacao_riscos_probabilidade" STRING,
    "classificacao_riscos_continuacao" STRING,
    "classificacao_riscos_severidade" STRING,
    "classificacao_riscos_classificacao" STRING,
    "empresaId" STRING,
    "area_avaliadaId" STRING,
    "unidadeId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Risco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perigo" (
    "id" STRING NOT NULL,
    "namePerigo" STRING,
    "unidadeName" STRING,
    "areaavaliadaName" STRING,
    "fase_levantamento_preliminar" STRING,
    "aspectos_ergonomico" STRING,
    "fator" STRING,
    "fontes" STRING,
    "ha_pergios_externos" STRING,
    "possiveis_lesoes" STRING,
    "empresaId" STRING,
    "area_avaliadaId" STRING,
    "unidadeId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historico" (
    "id" STRING NOT NULL,
    "empresaId" STRING,
    "revisao" STRING,
    "data" TIMESTAMP(3),
    "executado" STRING,
    "verificado" STRING,
    "descricao" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Historico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" STRING NOT NULL,
    "riscoId" STRING NOT NULL,
    "url" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Areaavaliada" (
    "id" STRING NOT NULL,
    "nameAvaliada" STRING NOT NULL DEFAULT '',
    "empresaId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Areaavaliada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" STRING NOT NULL,
    "nameUnidade" STRING NOT NULL DEFAULT '',
    "empresaId" STRING,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ergonomica" (
    "id" STRING NOT NULL,
    "nameAEP" STRING,
    "unidadeName" STRING,
    "areaavaliadaName" STRING,
    "empresaId" STRING,
    "area_avaliadaId" STRING,
    "unidadeId" STRING,
    "data_elaboracao" TIMESTAMP(3),
    "revisao_documento" TIMESTAMP(3),
    "jornada_trabalho" STRING,
    "cargo" STRING,
    "tipo_atividade" STRING,
    "variacao_turno" STRING,
    "trabalho_noturno" STRING,
    "descricao_ambiente_trabalho" STRING,
    "numero_trabalhadores_expostos" INT4,
    "tarefa_prescrita" STRING,
    "tarefa_real" STRING,
    "consideracoes_avaliador" STRING,
    "posto_trabalho" STRING,
    "ergonomista_responsavel" STRING DEFAULT 'Amanda Viviane Muniz Rodrigues - CREFITO 4/127866F',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ergonomica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pdf" (
    "id" STRING NOT NULL,
    "empresaId" STRING,
    "area_avaliadaId" STRING,
    "unidadeId" STRING,
    "url" STRING,

    CONSTRAINT "Pdf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Excell" (
    "id" STRING NOT NULL,
    "empresaId" STRING,
    "area_avaliadaId" STRING,
    "unidadeId" STRING,
    "url" STRING,

    CONSTRAINT "Excell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "Empresa_userId_idx" ON "Empresa"("userId");

-- CreateIndex
CREATE INDEX "Image_riscoId_idx" ON "Image"("riscoId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plano" ADD CONSTRAINT "Plano_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plano" ADD CONSTRAINT "Plano_area_avaliadaId_fkey" FOREIGN KEY ("area_avaliadaId") REFERENCES "Areaavaliada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plano" ADD CONSTRAINT "Plano_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risco" ADD CONSTRAINT "Risco_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risco" ADD CONSTRAINT "Risco_area_avaliadaId_fkey" FOREIGN KEY ("area_avaliadaId") REFERENCES "Areaavaliada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risco" ADD CONSTRAINT "Risco_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perigo" ADD CONSTRAINT "Perigo_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perigo" ADD CONSTRAINT "Perigo_area_avaliadaId_fkey" FOREIGN KEY ("area_avaliadaId") REFERENCES "Areaavaliada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perigo" ADD CONSTRAINT "Perigo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historico" ADD CONSTRAINT "Historico_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_riscoId_fkey" FOREIGN KEY ("riscoId") REFERENCES "Risco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Areaavaliada" ADD CONSTRAINT "Areaavaliada_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unidade" ADD CONSTRAINT "Unidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ergonomica" ADD CONSTRAINT "Ergonomica_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ergonomica" ADD CONSTRAINT "Ergonomica_area_avaliadaId_fkey" FOREIGN KEY ("area_avaliadaId") REFERENCES "Areaavaliada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ergonomica" ADD CONSTRAINT "Ergonomica_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_area_avaliadaId_fkey" FOREIGN KEY ("area_avaliadaId") REFERENCES "Areaavaliada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Excell" ADD CONSTRAINT "Excell_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Excell" ADD CONSTRAINT "Excell_area_avaliadaId_fkey" FOREIGN KEY ("area_avaliadaId") REFERENCES "Areaavaliada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Excell" ADD CONSTRAINT "Excell_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
