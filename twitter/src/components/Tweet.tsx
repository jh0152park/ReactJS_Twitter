function Tweet({ tweetObj, isOwner }: { tweetObj: any; isOwner: boolean }) {
    return (
        <div>
            <h4>{tweetObj.tweet}</h4>
            {isOwner ? (
                <>
                    <button>Edit</button>
                    <button>Delete</button>
                </>
            ) : null}
        </div>
    );
}

export default Tweet;
