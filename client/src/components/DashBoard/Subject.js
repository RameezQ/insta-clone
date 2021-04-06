// import React from 'react'
// import { Formik, Form, Field, FieldArray } from 'formik';
 
//  export const Subject = ({classOfTeach}) => {

//      return(
//    <div>
     
//      <Formik
//       initialValues={{ classOfTeach }}
     
//        render={({ values }) => (
          
//          <Form>
//            <FieldArray
//              name="classOfTeach"
//              render={arrayHelpers => (
//                <div>
//                  {values.classOfTeach && values.classOfTeach.length > 0 ? (
//                    values.classOfTeach.map((friend, index) => (
//                      <div key={index}>
//                        <Field name={`classOfTeach.${index}`} />
//                        <button
//                          type="button"
//                          onClick={() => arrayHelpers.remove(index)} 
//                        >
//                          -
//                        </button>
//                        <button
//                          type="button"
//                          onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
//                        >
//                          +
//                        </button>
//                      </div>
//                    ))
//                  ) : (
//                    <button type="button" onClick={() => arrayHelpers.push('')}>
//                      {/* show this when user has removed all classOfTeach from the list */}
//                      Add a friend
//                    </button>
//                  )}
//                  <div>
//                    <button type="submit">Submit</button>
//                  </div>
//                </div>
//              )}
//            />
//          </Form>
//        )}
//      />
//    </div>
//      )
//                  }
