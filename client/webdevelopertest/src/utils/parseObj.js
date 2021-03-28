
export function convertTableObj_studentDisplay(data) {
    var jsonObj = []
    var item
    data?.map((val) => {
        item = {
        ObjID: val._id,
        values: [
            val.fullName
        ]}
        jsonObj.push(item)
    })
    return jsonObj
}

export function convertModalObj_student(data){
    var item
    let parseDate
    if(data.birthDate === null){
      parseDate = ''
    }else{
      let date = new Date(data.birthDate)
      parseDate = date.toISOString().substring(0, 10);
    }
      item =[
        {tag: "First Name", val: data.firstName},
        {tag: "Last Name", val: data.lastName},
        {tag: "Birth Date", val: parseDate},
        {tag: "Email", val: data.email},
        {tag: "Address", val: data.addres},
        {tag: "Gender", val: (data.gender === 'F' ? "Female":"Male")}
      ]

    return item;

}