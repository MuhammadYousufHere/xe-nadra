import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import ErrorMessage from '../../../components/Form/ErrorMessage';
import { IntialValues } from '../Appointment';
import './licenceType.scss';

type LicenceTypes = {
  id: number;
  name: string;
};
type LicenceTypeProps = {
  licenceTypes: LicenceTypes[];
};
const LicenceType: FC<LicenceTypeProps> = ({ licenceTypes }) => {
  const { errors, setFieldValue, values } = useFormikContext<IntialValues>();

  const [selected, setSelected] = React.useState<string | undefined>(
    values.step_3.licenceType
  );
  const onSelectHandler = (type: string | undefined) => {
    setSelected(type);
  };
  return (
    <div className='licence-type-container'>
      <div className='licence_type_body'>
        <div className='licence_type_body_header'>
          <h3 className='title'>Select Driving Licence Type</h3>
        </div>
        <div className='licence_type_body_content'>
          {licenceTypes.map((licence) => (
            <div
              key={licence.id}
              className={`licence_type_body_content_item ${
                selected === licence.name && 'selected'
              }`}
              onClick={() => {
                onSelectHandler(licence.name);
                setFieldValue('step_3.licenceType', licence.name);
              }}
            >
              <p>{licence.name}</p>
            </div>
          ))}
        </div>
        {errors.step_3?.licenceType && (
          <ErrorMessage message={errors.step_3.licenceType} />
        )}
      </div>
    </div>
  );
};

export default LicenceType;
