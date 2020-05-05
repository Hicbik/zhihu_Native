import React, { FC } from 'react'
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder'

const Skeleton: FC = () => {
    return (
        <Placeholder Animation={Fade}>
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
        </Placeholder>
    )
}

export default Skeleton
