const baseUrl = "https://darm-app-api.herokuapp.com";


async function firebaseGetCardInfo() : Promise<any> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`${baseUrl}/card-data`, options);
    return await response.json();
}

async function firebaseSetCardInfo(data: any) : Promise<any> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`${baseUrl}/set-card-data`, options);
    return await response.json();
}
        

function getDigit(length: number) {
    return Math.round(Math.random() * length);
}

function generateCardNumber() {
    const number: Array<number> = [];
    
    let next = 4;
    for(let i = 0; i < next; i++) {
        const digit = getDigit(9999);

        if(!number.includes(digit) && digit.toString().length == 4) 
            number.push(digit)
        else next++;
    }
    
    const num = number.join("-");
    
    firebaseGetCardInfo()
    .then(data => {
        if (data?.cardsNumber?.includes(num)) generateCardNumber()
        else {
            firebaseSetCardInfo({
                cardsNumber: [
                    ...data.cardsNumber,
                    num
                ]
            })
        }
    })
    return num;
}


function generateCardCVCNumber() {
    const cvc: Array<number> = [];
    
    let next = 1;
    for(let i = 0; i < next; i++) {
        const digit = getDigit(999);

        if(!cvc?.includes(digit) && digit.toString().length == 3) 
            cvc[0] = digit
        else next++;
    }

    firebaseGetCardInfo()
    .then(data => {
        if (data?.cvc?.includes(cvc.toString())) generateCardCVCNumber()
        else {
            firebaseSetCardInfo({
                cvc: [
                    ...data.cvc,
                    cvc.toString()
                ]
            })
        }
    })
    return cvc[0];
}

function generateCardExpirationDate() {
    const availableExpirationDates: Array<String[]> = [];
    
    const date = new Date();    
    const month = date.getMonth();

    const strMonth = month < 10 ? `0${month+1}`: month+1;
    availableExpirationDates.push(
        [
            `${strMonth}/${date.getFullYear()+2}`,
            `${strMonth}/${date.getFullYear()+4}`,
            `${strMonth}/${date.getFullYear()+5}`,
            `${strMonth}/${date.getFullYear()+6}`,
        ]
    )

    const expires = Math.floor(Math.random() * 4);
    return availableExpirationDates[0][expires];
}


export interface CardProps {
    owner?: string | undefined,
    number?: string | undefined,
    cvc?: number | undefined,
    expirationDate?: string | undefined,
    flag?: string | undefined,
    type?: string | undefined
}

export function createCard(props?: CardProps) {
    const date = generateCardExpirationDate().toString();
    return {
        owner: props?.owner,
        number: generateCardNumber(),
        cvc: generateCardCVCNumber(),
        expirationDate: `${date.substring(0, 2)}/${date.substring(5)}`,
        flag: props?.flag,
        type: props?.type
    }
}
