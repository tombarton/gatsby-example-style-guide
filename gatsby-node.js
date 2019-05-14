const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allPagesJson {
        nodes {
          path
          template 
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    return result.data.allPagesJson.nodes.forEach((node) => {
      createPage({
        path: node.path,
        component: path.resolve(`src/templates/${String(node.template)}.jsx`),
        context: {},
      });
    });
  });
};
