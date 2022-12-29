import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import ErrorMessage from '../../../components/Form/ErrorMessage';
import { IntialValues } from '../Appointment';
import './tableStyles.scss';

//array of strings
export type TableHeadings = string[];

export interface tableBody {
  select?: React.ReactNode | JSX.Element | string;
  time?: string;
  available?: number | string;
  booked?: number | string;
}
export type Data = {
  tableHeadings: TableHeadings;
  tableBody: tableBody[];
};

type TableProps = {
  title: string;
  subtitle?: string;
  date?: string;
  data: Data;
};

const TimeSlotSelection: FC<TableProps> = ({ title, subtitle, date, data }) => {
  const { errors, setFieldValue, values } = useFormikContext<IntialValues>();

  const [selected, setSelected] = React.useState<string | undefined>(
    values.step_4.timeSlot
  );
  const onSelectHandler = (time: string | undefined) => {
    setSelected(time);
  };
  return (
    <>
      <div className='container'>
        <div className='container__headings'>
          <h1 className='title'>{title}</h1>
          <p className='subtitle'>{subtitle}</p>
          <p className='subtitle'>{date}</p>
        </div>

        <table>
          <thead>
            <tr>
              {data.tableHeadings.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.tableBody.map(({ select, time, available, booked }, i) => (
              <tr key={time}>
                <td>
                  <div
                    className={`select ${selected === time && 'active'}`}
                    onClick={() => {
                      onSelectHandler(time);
                      setFieldValue('step_4.timeSlot', time);
                    }}
                  >
                    {select}
                  </div>
                </td>
                <td>{time}</td>
                <td>{available}</td>
                <td>{booked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errors.step_4?.timeSlot && (
        <ErrorMessage message={errors.step_4.timeSlot} />
      )}
    </>
  );
};

export default TimeSlotSelection;
