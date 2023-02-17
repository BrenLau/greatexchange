const { sequelize } = require('./models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
        return await sequelize.createSchema(process.env.SCHEMA);
    }
});
