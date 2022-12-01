create table Link(
    id bigint not null auto_increment,
    name varchar(255) not null,
    url varchar(255) not null,
    icon_url varchar(255) not null,
    primary key(id)
)