import { ReactNode, Children, useState, ReactElement } from "react";
import { Formik, FormikConfig, FormikValues, Form } from "formik";
import Pagination from "./components/Pagination";
import { Button } from "../../components/common";
import "./appointmentStyles.scss";
export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}
interface MultistepFormWrapperProps {
  children: ReactNode;
}
export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}
export const MultistepFormWrapper = ({
  children,
  ...props
}: MultistepFormWrapperProps & FormikConfig<FormikValues>) => {
  const childrenArray = Children.toArray(
    children
  ) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const currentValidationSchema = currentChild.props.validationSchema;
  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
      validationSchema={currentValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {currentChild}
          <main className="form-footer">
            {step > 0 ? (
              <div className="action-btn">
                <Button
                  disabled={isSubmitting}
                  variant="secondary"
                  onClick={() => setStep((s) => s - 1)}
                  type="button"
                  title="Back"
                />
              </div>
            ) : null}
            <div className="action-btn">
              <Button
                disabled={isSubmitting}
                variant="secondary"
                type="submit"
                title={
                  isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"
                }
              />
            </div>
          </main>
          <Pagination length={childrenArray.length} current={step} />
        </Form>
      )}
    </Formik>
  );
};
