const Soma = (n1, n2) => n1 + n2 ;

const Subtrai = (n1, n2) => n1 - n2;

const Multiplica = (n1, n2) => n1 * n2;

const Divide = (n1, n2) => n1 / n2 ;

function MostraResultado(num1, num2) {
    console.log(`Soma entre ${num1} e ${num2}`, Soma(num1, num2))
    console.log(`Subtração entre ${num1} e ${num2}`, Subtrai(num1, num2))
    console.log(`Multiplicação entre ${num1} e ${num2}`, Multiplica(num1, num2))
    console.log(`Divisão entre ${num1} e ${num2}`, Divide(num1, num2))
};

MostraResultado(15, 3);