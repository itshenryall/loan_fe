export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'MANAGEMENT',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Loan AssignmentRule',
      url: '/assignment',
      icon: 'icon-pin',
    },
    {
      name: 'Loan Customers',
      url: '/customer',
      icon: 'icon-user',
    },
    {
      name: 'Loan Transaction',
      url: '/transaction',
      icon: 'icon-shuffle',
    },
    {
      name: 'Offering Package',
      url: '/offer',
      icon: 'icon-layers',
    },
  ]
};
