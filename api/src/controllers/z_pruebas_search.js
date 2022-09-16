const { Op } = require("sequelize");

Foo.findAll({
    where: {
        rank: {
            [Op.or]: {
                [Op.lt]: 1000,
                [Op.eq]: null
            }
        },
    // rank < 1000 OR rank IS NULL

    {
        createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
    },
    // createdAt < [timestamp] AND createdAt > [timestamp]

    {
        [Op.or]: [
            {
                title: {
                    [Op.like]: 'Boat%'
                }
            },
            {
                description: {
                    [Op.like]: '%boat%'
                }
            }
        ]
    }
    // title LIKE 'Boat%' OR description LIKE '%boat%'
  }
});