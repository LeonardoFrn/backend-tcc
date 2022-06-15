const TABLE = 'temperatura'
const Base = new (require('../../database/base'))(TABLE);

const getContent = async function () {
  return Base.getAll()
}

const addContent = async (values) => {
  return Base.insert(values)
}


exports.getContent = getContent;
exports.addContent = addContent;