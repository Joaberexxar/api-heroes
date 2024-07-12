DROP TABLE IF EXISTS TB_HEROES;

CREATE TABLE IF NOT EXISTS TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

INSERT INTO TB_HEROES (NAME, PODER)
    VALUES
        ('Flash', 'Velocidade'),
        ('Superman', 'Força'),
        ('Batman', 'Dinheiro'),
        ('Mulher Maravilha', 'Laço'),
        ('Homem Aranha', 'Velocidade')

SELECT * FROM TB_HEROES;
SELECT * FROM TB_HEROES WHERE NAME = 'Flash';

UPDATE TB_HEROES
SET NAME = 'Goku', PODER = 'Kamehameha'
WHERE ID = 1

DELETE FROM TB_HEROES WHERE ID = 4