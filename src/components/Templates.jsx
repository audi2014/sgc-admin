import React from "react";
import { Grid, Segment, Menu, List as SemanitcList } from "semantic-ui-react";
import Center from 'react-center';
import TimeAdjustment from "./calendar/TimeAdjustment";
const PageTemplate = ({
                          pagination,
                          listMenu,
                          detailsItems = [],
                          left = 5,
                          leftMd = 7,
                          rightLg = 10,
                          rightMd = 9,
                      }) => {
    return (
        <Grid >
            <Grid.Column mobile={16} tablet={leftMd} computer={4} width={left}>
                {listMenu}
                {pagination}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={rightMd} computer={rightLg} width={rightLg}>
                {detailsItems.map((details, k) => <Segment key={k}>{details}</Segment>)}
            </Grid.Column>
        </Grid>
    );
};

const MenuTemplate = ({ header, items, fotter, topMenu, search, style }) => {
    return (
        <Menu fluid vertical size="large" style={ {minHeight:500, ...style} } >
            <Menu.Item>
                <Menu.Header>
                    <Center>
                    {header}
                    </Center>
                    </Menu.Header>
            </Menu.Item>
            <Menu.Menu>
                <Center>
                {topMenu}
                </Center>
                </Menu.Menu>
            <Menu.Item>{search}</Menu.Item>
            <Menu.Item>
                <SemanitcList>{items}</SemanitcList>
            </Menu.Item>
            <Menu.Item>{fotter}</Menu.Item>

        </Menu>
    );
};

export { MenuTemplate, PageTemplate };
