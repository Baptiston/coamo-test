CREATE TABLE public.state (
	id serial NOT NULL,
	description varchar NOT NULL,
	uf varchar NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT state_pk PRIMARY KEY (id)
);

CREATE TABLE public.city (
	id serial NOT NULL,
	description varchar NOT NULL,
	state bigint NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT city_pk PRIMARY KEY (id),
	CONSTRAINT city_fk FOREIGN KEY (state) REFERENCES public.state(id)
);

CREATE TABLE public.unit (
	id serial NOT NULL,
	description varchar NOT NULL,
	city bigint NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT unit_pk PRIMARY KEY (id),
	CONSTRAINT unit_fk FOREIGN KEY (city) REFERENCES public.city(id)
);

CREATE TABLE public."group" (
	id serial NOT NULL,
	description varchar NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT group_pk PRIMARY KEY (id)
);

CREATE TABLE public.product (
	id serial NOT NULL,
	description varchar NOT NULL,
	unitary_value double precision NOT NULL,
	unit_measure varchar NOT NULL,
	formula text NOT NULL,
	"group" bigint NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT product_pk PRIMARY KEY (id),
	CONSTRAINT product_fk FOREIGN KEY ("group") REFERENCES public."group"(id)
);

CREATE TABLE public.type_person (
	id serial NOT NULL,
	description varchar NOT NULL,
	abbreviation varchar NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT type_person_pk PRIMARY KEY (id)
);

CREATE TABLE public.category (
	id serial NOT NULL,
	description varchar NOT NULL,
	percentage float8 NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE public.cooperated (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	cpf_cnpj varchar NOT NULL,
	rg varchar NULL,
	opening_date date NULL,
	type_person bigint NOT NULL,
	birth_date date NULL,
	marital_status varchar NULL,
    category bigint NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT cooperated_pk PRIMARY KEY (id),
	CONSTRAINT cooperated_fk FOREIGN KEY (type_person) REFERENCES public.type_person(id),
    CONSTRAINT cooperated_fk_1 FOREIGN KEY (category) REFERENCES public.category(id)
);

CREATE TABLE public.partner (
	id serial NOT NULL,
	cpf varchar NOT NULL,
	"name" varchar NOT NULL,
	rg varchar NOT NULL,
	cooperated bigint NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT partner_pk PRIMARY KEY (id)
    CONSTRAINT partner_fk FOREIGN KEY (cooperated) REFERENCES public.cooperated(id)
);

CREATE TABLE public.sale (
	id serial NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	cooperated bigint NOT NULL,
	unit bigint NOT NULL,
	total double precision NOT NULL,
	CONSTRAINT sale_pk PRIMARY KEY (id),
	CONSTRAINT sale_fk FOREIGN KEY (unit) REFERENCES public.unit(id),
	CONSTRAINT sale_fk_1 FOREIGN KEY (cooperated) REFERENCES public.cooperated(id)
);

CREATE TABLE public.product_sale (
	id serial NOT NULL,
	product bigint NOT NULL,
	sale bigint NOT NULL,
	total double precision NOT NULL,
	icms varchar NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	quantity int NOT NULL,
	CONSTRAINT product_sale_pk PRIMARY KEY (id),
	CONSTRAINT product_sale_fk FOREIGN KEY (sale) REFERENCES public.sale(id),
	CONSTRAINT product_sale_fk_1 FOREIGN KEY (product) REFERENCES public.product(id)
);

CREATE TABLE public.tax (
	id serial NOT NULL,
	description varchar NOT NULL,
	total double precision NOT NULL,
	product_purpose varchar NOT NULL,
	sale_unit bigint NOT NULL,
	consumption_state bigint NOT NULL,
	product_group bigint NOT NULL,
	type_person bigint NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT tax_pk PRIMARY KEY (id),
	CONSTRAINT tax_fk FOREIGN KEY (sale_unit) REFERENCES public.unit(id),
	CONSTRAINT tax_fk_1 FOREIGN KEY (product_group) REFERENCES public."group"(id),
	CONSTRAINT tax_fk_2 FOREIGN KEY (consumption_state) REFERENCES public.state(id),
	CONSTRAINT tax_fk_3 FOREIGN KEY (type_person) REFERENCES public.type_person(id)
);

INSERT INTO public.state(description, uf) VALUES('SANTA CATARINA', 'SC');
INSERT INTO public.state(description, uf) VALUES('MATO GROSSO DO SUL', 'MS');
INSERT INTO public.state(description, uf) VALUES('PARANA', 'PR');

INSERT INTO public.city(description, state) VALUES('CAMPO MOURAO', 3);

INSERT INTO public.unit(description, city) VALUES('SEDE', 1);

INSERT INTO public."group" (description) VALUES('FERTILIZANTES');
INSERT INTO public."group" (description) VALUES('CORRETIVOS');
INSERT INTO public."group" (description) VALUES('HERBICIDAS');
INSERT INTO public."group" (description) VALUES('FUNGICIDAS');
INSERT INTO public."group" (description) VALUES('INSETICIDAS');

INSERT INTO public.product(description, unitary_value, unit_measure, formula, "group") VALUES('ROUND UP', 120.00, 'LT', 'Herbicida tradicional no manejo de plantas daninhas.', 3);
INSERT INTO public.product(description, unitary_value, unit_measure, formula, "group") VALUES('ACTA TRICHO', 70.00, 'MG', 'Acta Tricho é um nematicida e fungicida microbiológico a base de Trichoderma asperellum, Trichoderma harzianum e Trichoderma viridae.', 4);
INSERT INTO public.product(description, unitary_value, unit_measure, formula, "group") VALUES('TURFA LIQUIDA', 68.00, 'LT', 'É um produto com elevado percentual de matéria orgânica de alta qualidade , que substitui de forma total o esterco animal e a cama de aviário', 1);
INSERT INTO public.product(description, unitary_value, unit_measure, formula, "group") VALUES('K-OTHRINE', 15.00, 'ML', 'O Inseticida K-Othrine SC 25 é um produto líquido que controla os ambientes contra infestações de insetos, sejam eles voadores ou rasteiros', 5);

INSERT INTO public.category (description, percentage) VALUES('A', 5);
INSERT INTO public.category (description, percentage) VALUES('B', 3);
INSERT INTO public.category (description, percentage) VALUES('C', 0);

INSERT INTO public.type_person (description, abbreviation) VALUES('PESSOA FISICA', 'PF');
INSERT INTO public.type_person (description, abbreviation) VALUES('PESSOA JURIDICA', 'PJ');

INSERT INTO public.tax(description, total, product_purpose, sale_unit, consumption_state, product_group, type_person) VALUES('ICMS 01', 18, 'APLICACAO', 1, 3, 1, 1);
INSERT INTO public.tax(description, total, product_purpose, sale_unit, consumption_state, product_group, type_person) VALUES('ICMS 02', 12, 'APLICACAO', 1, 1, 3, 2);
INSERT INTO public.tax(description, total, product_purpose, sale_unit, consumption_state, product_group, type_person) VALUES('ICMS 03', 0, 'APLICACAO', 1, 1, 5, 1);