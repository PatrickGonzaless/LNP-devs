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

INSERT INTO produto (cod, nome, qtd, valor, avaliacao, descricao, stats)
VALUES
    (101, 'Produto 1', 50, 29.99, 4.5, 'Descrição do Produto 1', true),
    (102, 'Produto 2', 20, 49.99, 3.8, 'Descrição do Produto 2', false),
    (103, 'Produto 3', 100, 19.99, 4.7, 'Descrição do Produto 3', true);


create table img_prod(
id_img integer auto_increment primary key,
nome varchar(200) not null,
linkimg varchar(250) not null,
padrao boolean,
produto_id integer not null,
foreign key (produto_id) references produto(id)
);


INSERT INTO img_prod (nome, linkimg, padrao, produto_id)
VALUES ('Imagem Produto 1', 'https://exemplo.com/imagem1.jpg', true, 1);

INSERT INTO img_prod (nome, linkimg, padrao, produto_id)
VALUES ('Imagem Produto 2', 'https://exemplo.com/imagem2.jpg', true, 2);

INSERT INTO img_prod (nome, linkimg, padrao, produto_id)
VALUES ('Imagem Produto 3', 'https://exemplo.com/imagem3.jpg', true, 3);