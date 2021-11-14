
type UserData = {
    age: number,
    gender: string,
    hasDrivingLicense: boolean,
    isFirstCar: boolean,
    prefersDrivetrain: string,
    caresAboutFuelEmissions: boolean,
    hasCars: number,
    hasCarMakeModel: string
}

export const validateFields = (userData: UserData) => {
    if('age' in userData 
    && 'gender' in userData 
    && 'hasDrivingLicense' in userData 
    && 'isFirstCar' in userData 
    && 'prefersDrivetrain' in userData
    && 'caresAboutFuelEmissions' in userData
    && 'hasCars' in userData
    && 'hasCarMakeModel' in userData) {
        return true
    }
    return false;
}

export const validateAge = (age: number) => {
    return age && age < 18 ? false : true;
}


export const validateFirstCar = (isFirstCar: boolean) => {
    
}