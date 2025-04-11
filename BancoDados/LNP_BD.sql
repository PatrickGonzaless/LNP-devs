create database user_databs;

use user_databs;

create table register(
id integer auto_increment primary key,
username varchar(100) not null unique,
cpf char (11) not null unique,
email varchar(50) not null unique,
grupo varchar(14),
senha text not null,
stats boolean
);

create table produto(
id integer auto_increment primary key,
nome varchar(200) not null,
qtd integer not null,
valor decimal(10,2) not null,
avaliacao decimal (2,1),
descricao varchar(2000),
stats boolean not null
);


create table img_prod(
id_img integer auto_increment primary key,
nome varchar(200) not null,
linkimg varchar(250) not null,
padrao boolean,
produto_id integer not null,
foreign key (produto_id) references produto(id)
);


create table cliente(
id integer auto_increment primary key,
email varchar (50) not null,
cpf char (11) not null unique,
nomecompleto varchar (100) not null,
datanascimento date,
genero boolean,
senha text not null
);

ALTER TABLE cliente MODIFY COLUMN datanascimento DATE;

create table enderecos(
id_endereco integer auto_increment primary key,
logradouro varchar (100) not null,
cep varchar(9) not null,
bairro varchar (100) not null,
uf char(2) not null,
cidade varchar (100) not null,
numero char (4) not null,
complemento varchar(20) not null,
tipoendereco boolean,
principal boolean,
id_cliente integer not null,
foreign key (id_cliente) references cliente(id)
);

select * from cliente;
