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

insert into register (id,username,cpf,email,grupo,senha,stats) values (null, 'Patrick', '4126166980', 'patrickgonzales031@gmail.com', 'Adm', '123', true),
(null, 'Nicolas', '54002619819', 'nvs.silva@gmail.com', 'Adm', '123', true),
(null, 'Lucas', '46372001802', 'contadolucas40@gmail.com', 'Adm', '123', true);

select * from register;

SELECT VERSION();
