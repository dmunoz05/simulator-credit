import { useLocation } from 'react-router-dom';
import './styles.css';

function SimulatorCreditResult() {

    const location = useLocation();
    const inputData = location.state;

    return (
        <div className='div-principal-div'>
            <div>
                <h1 className='h1-simula-tu-credito'>Simula tu credito</h1>
            </div>

            <div className='div-content-form'>
                <div className='div-content-form-internt'>
                    <h1 className='title-h1-credit'>
                        Te ofrecemos estas opción según los datos suministrados.
                    </h1>
                </div>

                <div className='div-content-form-internt'>
                    <button className='btn-type-credit-result'>
                        {inputData.typeCredit}
                    </button>
                </div>

                <br />

                <div className='div-content-form-internt'>
                    <h1 className='title-h1-credit font-normal'>
                        Te prestamos:
                    </h1>
                </div>

                <div className='div-content-form-internt-two'>
                    <input type="text" name="my_custom_field" id="myCustomField" defaultValue={inputData.credit} />
                </div>

                <br />
                <br />

                <div className='div-content-form-internt'>
                    <h1 className='title-h1-credit'>
                        Pagarás {inputData.dues.length ? inputData.dues.length : 'X'} cuotas mensuales por un valor aproximado de:
                    </h1>
                </div>

                <div className='div-content-form-internt'>
                    <input type="text" name="my_custom_field" id="myCustomField" defaultValue={inputData.dues[0].valor} />
                </div>

                <br />
                <br />

                <div className='grid justify-center place-content-center text-start'>
                    <h1 className='title-h1-credit font-normal'>
                        Tasa*
                    </h1>
                </div>

                <div className='grid justify-center place-content-center text-center'>
                    <span className='flex flex-row justify-around w-[35rem]'>
                        <h1 className='title-h1-credit font-normal'>
                            Tasa de interés mes vencido
                        </h1>
                        <h1 className='title-h1-credit font-normal'>
                            {inputData.rateMouth} % M.V
                        </h1>
                    </span>
                    <span className='flex flex-row justify-around w-[35rem]'>
                        <h1 className='title-h1-credit font-normal'>
                            Tasa de interés efectivo anual
                        </h1>
                        <h1 className='title-h1-credit font-normal'>
                            {inputData.rateYear} % E.A
                        </h1>
                    </span>
                </div>               
                
                <div className='m-4 p-4'>
                    <div>
                        <button type="submit" className='btn-simular-credit'>
                            SOLICITAR CRÉDITO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimulatorCreditResult;
