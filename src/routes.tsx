import { Switch, Route, Redirect, Link, useRouteMatch } from 'react-router-dom';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Editor from './components/editor';

const initialQueryMc = `# shift-option/alt-click on a query below to jump to it in the explorer
# option/alt-click on a field in the explorer to select all subfields
query AboutMe {
  amILoggedIn
  me {
    firstName
    email
  }
}
`;
const initialQueryCtp = `# shift-option/alt-click on a query below to jump to it in the explorer
# option/alt-click on a field in the explorer to select all subfields
query ProjectInfo {
  project {
    name
    key
  }
}
`;
const initialQuerySettings = `# shift-option/alt-click on a query below to jump to it in the explorer
# option/alt-click on a field in the explorer to select all subfields
query ProjectExtension {
  projectExtension {
    id
  }
}
`;

const ApplicationRoutes = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/platform`}>
        <Editor target="ctp" initialQuery={initialQueryCtp} />
      </Route>
      <Route path={`${match.path}/users`}>
        <Editor target="mc" initialQuery={initialQueryMc} />
      </Route>
      <Route path={`${match.path}/settings`}>
        <Editor target="settings" initialQuery={initialQuerySettings} />
      </Route>
      <Redirect exact={true} from={`${match.path}/*`} to={match.url} />
      <Route>
        <Spacings.Inset>
          <Constraints.Horizontal max={10}>
            <Spacings.Stack scale="m">
              <Text.Headline as="h1">GraphQL Explorer</Text.Headline>
              <Text.Body>
                Explore some of the GraphQL APIs of the commercetools platform
                using the GraphiQL IDE.
              </Text.Body>
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <ul>
                <li>
                  <FlatButton
                    as={Link}
                    to={`${match.url}/platform`}
                    label="Explore the commercetools platform GraphQL API"
                  />
                </li>
                <li>
                  <FlatButton
                    as={Link}
                    to={`${match.url}/users`}
                    label="Explore the Merchant Center Users GraphQL API"
                  />
                </li>
                <li>
                  <FlatButton
                    as={Link}
                    to={`${match.url}/settings`}
                    label="Explore the Merchant Center Settings GraphQL API"
                  />
                </li>
              </ul>
              <ContentNotification type="warning">
                Certain queries or mutations may be rejected given the lack of
                OAuth Scopes associated to the permissions granted to the user
                for this project.
              </ContentNotification>
            </Spacings.Stack>
          </Constraints.Horizontal>
        </Spacings.Inset>
      </Route>
    </Switch>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
