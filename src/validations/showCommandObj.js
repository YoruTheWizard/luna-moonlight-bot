module.exports = ({ interaction, commandObj }) => {
  if (commandObj?.options?.showObj)
    console.log(commandObj);
};