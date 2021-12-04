import {license_types, resource_types, game_types} from "../../definitions/Types";

const generatePracticeTheoryLevel0 = () => {
    let data = [
        {[license_types.CC_BY]: `Original authors must be credited`},
        {[license_types.CC_BY_SA]: `Redistributions with the same license as the original`},
        {[license_types.CC_BY_NC]: `Commercial use is NOT allowed`}
    ];
    return {
        type: game_types.PRACTICE_THEORY,
        level: 0,
        data: data,
        description: 'Arrange the description (on the right) to match the licences (on the left)',
        numberOfMatches: data.length
    };
};

const generatePracticeTheoryLevel1 = () => {
    let data = [
        {[license_types.CC_BY_NC_SA]: `Commercial use is NOT allowed; Redistributions with the same license as the original`},
        {[license_types.CC_BY_ND]: `Adaptation is NOT allowed`},
        {[license_types.CC_BY_NC_ND]: `Adaptation and commercial use are NOT allowed`},
    ];
    return {
        type: game_types.PRACTICE_THEORY,
        level: 1,
        data: data,
        description: 'Arrange the description (on the right) to match the licences (on the left)',
        numberOfMatches: data.length
    };
};

const generatePracticeTheoryLevel2 = () => {
    let data = [
        {Composition: 'Resources can be clearly differentiated from each other'},
        {Collage: 'Resources are blended into the other and cannot be differentiated from each other'}
    ];
    return {
        type: game_types.PRACTICE_THEORY,
        level: 2,
        data: data,
        description: 'Arrange the description (on the right) to match the concepts (on the left)',
        numberOfMatches: data.length
    }
};

// helper function for generatePracticeEditingLevel1
const containOnlyNDLicenses = (generated_result) => {
    for (let i = 0; i < generated_result.length; i++) {

        // check if the generated resource is licensed with ND license
        if (generated_result[i]['resource_type'] !== 'CC_BY_ND' && generated_result[i]['resource_type'] !== 'CC_BY_NC_ND') {
            return false;
        }
    }
    return true;
};

const generatePracticeEditingLevel0 = (type) => {
    const all_resources = Object.keys(resource_types).map(key => {
        if (resource_types.hasOwnProperty(key)) {
            return resource_types[key]
        }
    });
    const licenses = [license_types.CC_ZERO, license_types.CC_BY, license_types.CC_BY_SA, license_types.CC_BY_NC, license_types.CC_BY_NC_SA, license_types.CC_BY_ND, license_types.CC_BY_NC_ND];
    let result = {
        type,
        level: 0,
        number_of_required_resource: 2,
        description: `Pick at least two resources and drop onto the lava to combine a ${type === game_types.PRACTICE_EDITING_COLLAGE ? 'collage' : 'composition'}`,
        resources: []
    };

    for (let i = 0; i < 4; i++) {
        const resource = all_resources[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.resources.push({
            resource_type: resource,
            license: license,
            resource_id: i + '-' + resource + '-' + license
        });
    }

    if (containOnlyNDLicenses(result.resources)) {
        return generatePracticeEditingLevel0();
    }

    return result;
};

const generatePracticeEditingLevel1 = (type) => {
    const all_resources = Object.keys(resource_types).map(key => {
        if (resource_types.hasOwnProperty(key)) {
            return resource_types[key]
        }
    });
    const licenses = [license_types.CC_ZERO, license_types.CC_BY, license_types.CC_BY_SA, license_types.CC_BY_NC, license_types.CC_BY_NC_SA, license_types.CC_BY_ND, license_types.CC_BY_NC_ND];

    let result = {
        type,
        level: 1,
        number_of_required_resource: 3,
        description: `Pick at least three resources and drop onto the lava to combine a ${type === game_types.PRACTICE_EDITING_COLLAGE ? 'collage' : 'composition'}`,
        resources: []
    };

    for (let i = 0; i < 4; i++) {
        const resource = all_resources[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.resources.push({
            resource_type: resource,
            license: license,
            resource_id: i + '-' + resource + '-' + license
        });
    }

    if (containOnlyNDLicenses(result.resources)) {
        return generatePracticeEditingLevel1();
    }

    return result;
};

const practiceTheoryGenerator = (level) => {
    switch (level) {
        case 0:
            return generatePracticeTheoryLevel0();
        case 1:
            return generatePracticeTheoryLevel1();
        case 2:
            return generatePracticeTheoryLevel2();
        default:
            return null;
    }
};

const practiceEditingGenerator = (level, type) => {
    switch (level) {
        case 0:
            return generatePracticeEditingLevel0(type);
        case 1:
            return generatePracticeEditingLevel1(type);
        default:
            return null;
    }
};

export {practiceTheoryGenerator, practiceEditingGenerator};