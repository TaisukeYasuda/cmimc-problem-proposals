create table staff (
    staff_id int not null auto_increment,
    name varchar(255),
    email varchar(255),
    password varchar(255),
    salt varchar(255),
    privilege enum('admin', 'secure', 'test-solver', 'member'),
    joined datetime,
    primary key (staff_id)
);
create table proposals (
    prob_id int not null auto_increment,
    year int,
    subject int,
    problem varchar(4095),
    answer varchar(255),
    solution varchar(4095),
    difficulty int,
    staff_id int,
    created datetime,
    updated datetime,
    update_cmt varchar(4095),
    primary key (prob_id)
);
create table comments (
    cmt_id int not null auto_increment,
    prob_id int,
    comment varchar (4095),
    staff_id int,
    created datetime,
    updated datetime,
    primary key (cmt_id)
);
create table alternate_solutions (
    soln_id int not null auto_increment,
    prob_id int,
    solution varchar(4095),
    staff_id int,
    created datetime,
    updated datetime,
    update_cmt varchar(4095),
    primary key (soln_id)
);
create table subjects (
    subject_id int not null auto_increment,
    title varchar(255),
    primary key (subject_id)
);
insert into subjects set title="Algebra";
insert into subjects set title="Combinatorics";
insert into subjects set title="Computer Science";
insert into subjects set title="Geometry";
insert into subjects set title="Number Theory";

