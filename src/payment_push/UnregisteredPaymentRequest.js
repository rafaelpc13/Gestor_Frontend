'use strict';

//const axios = require('axios');
const auth = require('../Auth');
const appCfg = require('../AppConf');
const Constants = require('../utils/Constants');

const RestEndpoint = '/payments/v2/-services-paymentservice-unregisteredpayment';

class UnregisteredPaymentRequest {
    static async call() {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: await auth.getToken(),
            'x-api-key': appCfg.apiKey
        };

        const endpoint = `${appCfg.apiBasePath}${RestEndpoint}`;

        const data = {
            RequestMessage: {
                RequestHeader: {
                    Channel: 'PNP04-C001',
                    RequestDate: '2020-01-17T20:26:12.654Z',
                    MessageID: '1234',
                    ClientID: "123456",
                    Destination: {
                        ServiceName: 'PaymentsService',
                        ServiceOperation: 'unregisteredPayment',
                        ServiceRegion: 'C001',
                        ServiceVersion: '1.2.0'
                    }
                },
                RequestBody: {
                    any: {
                        unregisteredPaymentRQ: {
                            phoneNumber: '3400100034',
                            code: 'NIT_1',
                            value: '1',
                            reference1: 'Referencia numero 1',
                            reference2: 'Referencia numero 2',
                            reference3: 'Referencia numero 3'
                        }
                    }
                }
            }
        };

        try {
            const response = await axios.request({
                url: endpoint,
                method: 'POST',
                headers,
                data
            });

            if (!!response && response.status === 200 && response.data) {
                const { data } = response;
                const {
                    StatusCode:statusCode = '',
                    StatusDesc:statusDesc = ''
                } = data.ResponseMessage.ResponseHeader.Status;

                if (statusCode === Constants.NEQUI_STATUS_CODE_SUCCESS) {
                    const {
                        transactionId = ''
                    } = data.ResponseMessage.ResponseBody.any.unregisteredPaymentRS;

                    console.info(
                        'Solicitud de pago realizada correctamente\n' +
                        `- Id Transacción -> ${transactionId.trim()}`
                    );
                } else {
                    throw new Error(`Error ${statusCode} = ${statusDesc}`)
                }
            } else {
                throw new Error('Unable to connect to Nequi, please check the information sent.');
            }
        } catch (error) {
            let msgError = '';

            if (error.isAxiosError) {
                const { status = 'Undefined', statusText = 'Undefined' } = error.response;

                msgError = `Axios error ${status} -> ${statusText}`;

                throw new Error(msgError);
            } else {
                throw error;
            }

        }
    }
}

(async function() {
    try {
        await UnregisteredPaymentRequest.call();
    } catch (error) {
        console.error(`Pagos con notificación -> Error resgistrando solicitud -> '${error.message}'`);
    }
}());