"use client";

// Loading UI of images
export default function NFTGrid({ nfts }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">
        NFT Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft, index) => (
          <div
            key={`${nft.contractAddress}-${nft.tokenId}`}
            className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden"
          >
            <div className="aspect-square relative">
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-100 truncate">
                {nft.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 truncate">
                {nft.collectionName}
              </p>
            </div>
          </div>
        ))}
        {nfts.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No NFTs found
          </div>
        )}
      </div>
    </div>
  );
}
