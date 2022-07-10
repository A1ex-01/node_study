const datalizeError = async (ctx, next) => {
  if (!ctx.form.isValid) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      errors: ctx.form.errors,
    };
    return;
  }
  await next();
};

module.exports = {
  datalizeError,
};
