export const handleChange = (
  index,
  field,
  value,
  parentIndex,
  fields,
  setFields
) => {
  const newFields = [...fields];
  newFields[parentIndex].childField[index] = {
    ...newFields[parentIndex].childField[index],
    [field]: value,
  };
  setFields(newFields);
};

export const addField = (fields, setFields, initialState) => {
  setFields([...fields, { medicine_type: 0, childField: [initialState] }]);
};

export const addChildField = (parentIndex, fields, setFields, initialState) => {
  const newFields = [...fields];
  newFields[parentIndex].childField.push({
    ...initialState,
    medicine_type: newFields[parentIndex].medicine_type,
  });
  setFields(newFields);
};
export const removeChildField = (
  parentIndex,
  childIndex,
  fields,
  setFields
) => {
  const newFields = [...fields];
  newFields[parentIndex].childField.splice(childIndex, 1);
  setFields(newFields);
};

export const removeParentField = (parentIndex, fields, setFields) => {
  const newFields = [...fields];
  newFields.splice(parentIndex, 1);
  setFields(newFields);
};
