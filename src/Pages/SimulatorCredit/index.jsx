import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FecthTypesCreditContext } from '../../Context';
import './styles.css';


const PopUp = (alert) => {

    const html = `
		<div class="modal-container" id="modal_container">
			<div class="modal">
				<h1 class="h1-ventana-modal">Advertencia</h1>
				</br>
				<p class="p-ventana-modal">
					${alert}
				</p>
				<button id="close">Cerrar</button>
			</div>
		</div>
		`;       

    return html;
}

const createObject = (data, type) => {
    const obj = data.filter(item => item.type_credit === type);
    return obj[0];
}

function SimulatorCredit() {
    const context = useContext(FecthTypesCreditContext);
    const navigate = useNavigate(); // Mover el hook useNavigate aquí
    
    const [inputAmount, setInputAmount] = useState('$0');
    const [inputMoths, setInputMoths] = useState(0);
    const [inputTypeCredit, setInputTypeCredit] = useState();
    const [amountMaxLabel, setAmountMaxLabel] = useState();
    const [monthsMaxLabel, setMonthsMaxLabel] = useState();
    const [rateMouth, setRateMouth] = useState();
    const [rateYear, setRateYear] = useState();
    const [monthlyPayment, setMonthlyPayment] = useState();
    const [dues, setDues] = useState();

    const handleAmountChange = (event) => {
        let amount = event.target.value;
        if (amount.includes('$')) {
            amount = amount.replace('$', '');
        }
        setInputAmount(amount);
    };

    const handleMonthsChange = (event) => {
        setInputMoths(event.target.value);
    };

    const handleTypeCreditChange = (event) => {
        let typeSelect = event.target.value;

        if (typeSelect === 'Seleccione...') {
            setInputTypeCredit(typeSelect);
            return;
        }

        const object = createObject(context.totalData, typeSelect);
        setInputTypeCredit(typeSelect);
        setMonthsMaxLabel(object.term);
        calculateSMMLV(object.max_amount);
        uptadedRates(object);
    };

    const uptadedRates = (obj) => {
        const split = obj.rate.split('/');
        setRateMouth(split[0]);
        setRateYear(split[1]);
    }

    const handleSimulator = (event) => {
        event.preventDefault();

        if (inputTypeCredit === undefined || inputTypeCredit === 'Seleccione...') {
            showModal('Debe seleccionar un tipo de crédito');
            return;
        }

        // Crea un objeto con los valores de los inputs
        const inputData = {
            amount: inputAmount,
            months: inputMoths,
            typeCredit: inputTypeCredit,
            rateMouth: rateMouth,
            rateYear: rateYear,
            credit: 0, // El valor del crédito se calculará más adelante
            dues: []
        };

        const valueConvert = convertInt(inputData.amount);

        const values = calculateCredit(parseFloat(inputData.rateMouth), parseFloat(inputData.rateYear), parseInt(inputData.months), valueConvert);
        inputData.credit = values[0];
        inputData.dues.push(...values[1]);

        //Validar que no sobrepase los campos del tipo de crédito
        const result = validateMaxFields(inputData);

        if (!result) return;

        // Pasa los datos en la propiedad `state` del objeto de ubicación y redirige al usuario
        navigate('/simulador-de-credito-result', { state: inputData });
    }

    function convertInt(data) {
        //Convertir int el valor de solicitud
        const amountString = data;
        const amountWithoutDots = amountString.replace(/\./g, ''); // Remueve los puntos
        const amountInteger = parseInt(amountWithoutDots, 10);

        return amountInteger;
    }

    //Calcular el crédito
    function calculateCredit(rateMount, rateYear, months, amount) {
        const totalInterestRate = rateMount / rateYear;
        const interest = (amount * totalInterestRate) / 100;
        const totalAmount = amount + interest;
        const monthlyPaymentValue = totalAmount / months;
        const formattedNumber = monthlyPaymentValue.toLocaleString('es-CO', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        });

        // Crear un arreglo para almacenar los detalles de cada cuota
        const cuotas = [];

        // Calcular el valor de cada cuota y agregarlo al arreglo
        for (let i = 1; i <= months; i++) {
            // Calcular el valor de la cuota por mes
            const cuotaPorMes = monthlyPaymentValue / months;

            // Agregar el valor formateado de la cuota al arreglo
            const formattedCuotaPorMes = cuotaPorMes.toLocaleString('es-CO', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
            });

            const cuota = {
                numero: i, // Número de la cuota
                valor: formattedCuotaPorMes, // Valor de la cuota formateado
            };
            cuotas.push(cuota);
        }

        // Establecer el estado con el arreglo de cuotas
        setMonthlyPayment(formattedNumber);
        setDues(cuotas); // Suponiendo que tienes un estado `cuotas` para almacenar el arreglo de cuotas

        const valuesArray = [formattedNumber, cuotas];

        return valuesArray;
    }



    // Función para calcular un valor en pesos colombianos dado un número de SMMLV
    function calculateSMMLV(smmlv) {
        // Salario mínimo actual en pesos colombianos
        const salarioMinimo = 1300606;

        // Convertimos el número de SMMLV a un valor numérico
        const smmlvNumerico = parseFloat(smmlv);

        // Validamos que el número de SMMLV sea un valor numérico válido
        if (isNaN(smmlvNumerico) || smmlvNumerico <= 0) {
            setAmountMaxLabel('No definido');
            console.log('El número de SMMLV debe ser un valor numérico mayor que cero.');
            return;
        }

        // Calculamos el valor en pesos colombianos
        const valorEnPesos = salarioMinimo * smmlvNumerico;

        // Formateamos el valor en pesos colombianos con puntos para separar las decenas, centenas y miles
        const valorFormateado = valorEnPesos.toLocaleString('es-CO');

        setAmountMaxLabel(valorFormateado);
    }


    function validateMaxFields(inputData) {
        //Validar que no sobre pase los campos 
        // const objectData = createObject(context.totalData, inputData.typeCredit);

        let amountMaxLabelInt = convertInt(amountMaxLabel);
        let monthsMaxLabelInt = convertInt(monthsMaxLabel);
        let inputAmountInt = convertInt(inputData.amount);
        let inputMonthsInt = convertInt(inputData.months);

        if (inputAmountInt > amountMaxLabelInt) {
            showModal('Debe de ingresar un monto menor a el máximo estipulado');
            return false;
        } else if (inputMonthsInt > monthsMaxLabelInt) {
            showModal('Debe de ingresar una cantidad de meses menor a el máximo estipulado');
            return false;
        } else {
            return true;
        }
    }

    function showModal(value) {
        const render = PopUp(value);
        if(render){
            const body = document.querySelector('.content-card');
            body.innerHTML = render;
            const modal_container = document.getElementById('modal_container');
            modal_container.classList.add('show');

            const close = document.querySelector('#close');
            close.addEventListener('click', () => {
                modal_container.classList.remove('show'); 
                window.location.reload();
            });
        }
    }


    return (
        <div className='content-card'>
            <div>
                <h1 className='h1-simula-tu-credito'>Simula tu credito</h1>
            </div>

            <div>
                <p className='p-simula-tu-credito'>
                    Elije el crédito que quieres solicitar,
                    calcula el valor de la cuota o el monto que puedes
                    solicitar de acuerdo con las necesidades de crédito y
                    capacidad de pago. Recuerda que para acceder a los créditos de Feinco
                    debes estar asociado al fondo. Aprobación sujeta a estudio y políticas de Feinco.
                </p>
            </div>

            <div className='div-content-form'>
                {/* <form id="myForm" method="post" action="https://feinco.com.co/simula-tu-credito-resultado/"> */}
                <form id="myForm" method="post">
                    <div className='div-sub-content-form'>
                        <h1 className='title-h1-credit'>
                            ¿Qué modalidad de crédito va a solicitar?
                        </h1>
                    </div>

                    <div className='div-content-select-type'>
                        <div className='div-intern-select-type'>
                            <select id='select-type-credit' value={inputTypeCredit} onChange={handleTypeCreditChange}>
                                <option>Seleccione...</option>
                                {context.totalData.map(item => {
                                    return (
                                        <option key={item.id} >{item.type_credit}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <br />

                    <div className='div-intern-select-type'>
                        <h1 className='title-h1-credit'>
                            ¿Cuanto dinero quiere solicitar?
                        </h1>
                    </div>

                    <div className='div-content-select-type'>
                        <input type="text" name="my_custom_field" id="myCustomField"
                            placeholder="$0" value={inputAmount} onChange={handleAmountChange} />
                        <hr />
                        <label id='monto-label' className='text-black text-start' >Monto Minimo: 1.000.000- Monto Maximo: {amountMaxLabel ? amountMaxLabel : '200.000.000'}</label>
                    </div>

                    <br />
                    <br />

                    <div className='div-content-select-type'>
                        <h1 className='title-h1-credit'>
                            ¿A cuántos meses?
                        </h1>
                    </div>

                    <div className='div-content-select-type'>
                        <input type="text" name="my_custom_field" id="myCustomField"
                            placeholder="0" value={inputMoths} onChange={handleMonthsChange} />
                        <hr />
                        <label id='meses-label' className='text-black text-start'>Hasta {monthsMaxLabel ? monthsMaxLabel : '60 Meses'}
                        </label>
                    </div>

                    <div className='m-4'>
                        <div>
                            <button type="submit" className='btn-simular-credit' onClick={(event) => handleSimulator(event)}>
                                <Link className='outline-none text-white hover:text-white' to='/simulador-de-credito-result'>
                                    Simular
                                </Link>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SimulatorCredit;