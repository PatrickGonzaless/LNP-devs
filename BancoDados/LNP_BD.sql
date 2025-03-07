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
cod integer not null unique,
nome varchar(200) not null,
qtd integer not null,
valor decimal(10,2) not null,
avaliacao decimal (2,1),
descricao varchar(2000)
);

select * from imgProd;

create table imgProd(
idImg integer auto_increment primary key,
nome varchar(200) not null,
linkimg varchar(250) not null,
padrao boolean,
produtoId integer not null,
foreign key (produtoId) references produto(id)
);

