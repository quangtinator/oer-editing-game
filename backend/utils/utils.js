const self = this;

exports.COMPATIBILITY_TABLE = {
    'cc zero': {
        'cc zero': 'cc zero',
        'cc by': 'cc by',
        'cc by-sa': 'cc by-sa',
        'cc by-nc': 'cc by-nc',
        'cc by-nd': false,
        'cc by-nc-sa': 'cc by-nc-sa',
        'cc by-nc-nd': false,
    },
    'cc by': {
        'cc zero': 'cc by',
        'cc by': 'cc by',
        'cc by-sa': 'cc by-sa',
        'cc by-nc': 'cc by-nc',
        'cc by-nd': false,
        'cc by-nc-sa': 'cc by-nc-sa',
        'cc by-nc-nd': false,
    },
    'cc by-sa': {
        'cc zero': 'cc by-sa',
        'cc by': 'cc by-sa',
        'cc by-sa': 'cc by-sa',
        'cc by-nc': false,
        'cc by-nd': false,
        'cc by-nc-sa': false,
        'cc by-nc-nd': false,
    },
    'cc by-nc': {
        'cc zero': 'cc by-nc',
        'cc by': 'cc by-nc',
        'cc by-sa': false,
        'cc by-nc': 'cc by-nc',
        'cc by-nd': false,
        'cc by-nc-sa': 'cc by-nc-sa',
        'cc by-nc-nd': false,
    },
    'cc by-nd': {
        'cc zero': false,
        'cc by': false,
        'cc by-sa': false,
        'cc by-nc': false,
        'cc by-nd': false,
        'cc by-nc-sa': false,
        'cc by-nc-nd': false,
    },
    'cc by-nc-sa': {
        'cc zero': 'cc by-nc-sa',
        'cc by': 'cc by-nc-sa',
        'cc by-sa': false,
        'cc by-nc': 'cc by-nc',
        'cc by-nd': false,
        'cc by-nc-sa': 'cc by-nc-sa',
        'cc by-nc-nd': false,
    },
    'cc by-nc-nd': {
        'cc zero': false,
        'cc by': false,
        'cc by-sa': false,
        'cc by-nc': false,
        'cc by-nd': false,
        'cc by-nc-sa': false,
        'cc by-nc-nd': false,
    },
};

exports.LICENSE_POWER_LEVEL = {
    'cc zero': 1,
    'cc by': 2,
    'cc by-sa': 3,
    'cc by-nc': 4,
    'cc by-nd': 5,
    'cc by-nc-sa': 6,
    'cc by-nc-nd': 7,
};

exports.checkCompatibilityComposition = ({licenseArray, clientLicenseAnswer}) => {
    clientLicenseAnswer = clientLicenseAnswer.toLowerCase();
    if (clientLicenseAnswer === 'none') {
        return {
            error_message: 'The answer cannot be none'
        }
    }
    const NC_LICENSES = ['cc by-nc', 'cc by-nc-nd', 'cc by-nc-sa'];
    let checker = false;
    let response = {
        error_message: null,
        result: true
    };

    for (let i = 0; i < licenseArray.length; i++) {
        licenseArray[i] = licenseArray[i].toLowerCase();
        if (NC_LICENSES.includes(licenseArray[i])) {
            checker = true;
        }
    }

    if (checker && !NC_LICENSES.includes(clientLicenseAnswer)) {
        response.error_message = 'The answer must contain NC license';
        response.result = false;
    } else {
        response.result = true;
    }
    return response;
};

exports.checkCompatibilityCollage = ({licenseArray, clientLicenseAnswer}) => {
    clientLicenseAnswer = clientLicenseAnswer.toLowerCase();
    console.log(licenseArray);
    for (let i = 0; i < licenseArray.length; i++) {
        licenseArray[i] = licenseArray[i].toLowerCase();
    }

    let response = {
        correctAnswer: licenseArray[0],
        lastSource: [licenseArray[0]],
        error_message: null,
        result: true
    };

    if (licenseArray.length === 1) {
        if (response.correctAnswer !== clientLicenseAnswer) {
            response.error_message = `${response.correctAnswer} !== ${clientLicenseAnswer}`;
            response.result = false;
        }
        return response;
    }

    for (let i = 1; i < licenseArray.length; i++) {
        response.lastSource = [response.correctAnswer, licenseArray[i]];
        console.log(response.correctAnswer);
        response.correctAnswer = self.COMPATIBILITY_TABLE[response.correctAnswer][licenseArray[i]] ? self.COMPATIBILITY_TABLE[response.correctAnswer][licenseArray[i]] : 'none';
        if (response.correctAnswer === 'none' || self.LICENSE_POWER_LEVEL[response.correctAnswer] > self.LICENSE_POWER_LEVEL[clientLicenseAnswer]) {
            break;
        }
    }

    if (response.correctAnswer !== clientLicenseAnswer) {
        response.error_message = `${response.lastSource[0]} + ${response.lastSource[1]} = ${response.correctAnswer} instead of ${clientLicenseAnswer}`;
        response.result = false;
    }

    return response;
};