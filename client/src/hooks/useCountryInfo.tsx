import { useMemo } from 'react';
import { Country } from 'country-state-city';
import uuid from 'react-uuid';

const useCountryInfo = () => {
  const countries = useMemo(() => {
    return Country.getAllCountries().map((country) => ({
      id: uuid(),
      name: country.name,
    }));
  }, []);
  const withPhoneCodes = useMemo(() => {
    return Country.getAllCountries().map((country) => ({
      id: uuid(),
      name: country.name,
      phoneCode: country.phonecode,
    }));
  }, []);
  return { countries, withPhoneCodes };
};

export default useCountryInfo;
