
#accidentFilter
create MongoDB filters from api input

input like
/api/v1/accident/groupby/?&sy=2019&ey=2023&sev=1&gb=vcl

MongoDB filter will look like:

[
  {
    $match: {
      $and: [
        {
          accident_year: {
            $gte: 2019,
            $lte: 2023,
          },
        },
        {
          $or: [
            {
              injury_severity_hebrew: "הרוג",
            },
          ],
        },
      ],
    },
  },
  {
    $group: {
      _id: "$vehicle_vehicle_type_hebrew",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
]